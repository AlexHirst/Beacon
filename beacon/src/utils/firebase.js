import * as firebase from 'firebase'
import _ from 'lodash'
import fk from 'faker'
import moment from 'moment'
import {Actions} from 'jumpsuit'

const usersRef = 'users/all';
const recoRef = 'appointments/all';

const config = {
  apiKey: "AIzaSyDZ0OWlMS5-0t4t6JMMsrw5-sUGwwK69Vw",
  authDomain: "beacon-a0f64.firebaseapp.com",
  databaseURL: "https://beacon-a0f64.firebaseio.com",
  projectId: "beacon-a0f64",
  storageBucket: "beacon-a0f64.appspot.com",
  messagingSenderId: "260036500893"
}


var getUserId = function(user) {
  var stringId = _(user).chain()
    .values()
    .value()
    .join('');
  return stringId;
}

class FB {
  constructor() {
    firebase.initializeApp(config)
    this.db = firebase.database().ref();
    this.getIp()
  }

  getIp() {
    var ipRef = this.db.child('/ip')
    ipRef.on('value', function(ss) {
      var v = ss.val()
      console.log('IP', v)
      if(v && v[0]) {
        Actions.updatePiIp({
          ip: v[0],
        })
      }
    })
  }

  fbUsers(id="") {
    return this.db.child(usersRef + "/" + id);
  }

  fbRecos(id="") {
    return this.db.child([recoRef, id].join('/'));
  }

  rfidLog(rfid) {
    return new Promise((resolve, reject) => {
      this.fbUsers().once('value').then(function(snapshot) {
        var r = snapshot.val();
        var user = _.find(r, {rfid: rfid});
        if (user) {
          resolve(user)
        } else {
          reject(`user ${rfid} not found`)
        }
      });
    })
  }

  getUser(id) {
    return new Promise(function(resolve, reject) {
      this.fbUsers(id).once('value').then(function(snapshot) {
        var r = snapshot.val();
        if(r) {
          resolve(r);
        } else {
          reject();
        }
      });
    });
  }

  getOrCreateUser(user) {
    var id = getUserId(user);
    return new Promise((resolve, reject) => {
      this.getUser(id).then(resolve, function() {
        user.id = id;
        this.fbUsers(id).set(user).then(function() {
          resolve(user);
        });
      });
    });
  }

  recosForUser(id) {
    return new Promise((resolve, reject) => {
      if(id) {
        this.fbRecos(id).once('value').then(function(snapshot) {
          var recos = snapshot.val() || [];
          resolve(recos);
        });
      } else {
        reject('no user given')
      }
    });
  }

  checkRecos(data) {
    this.getUser(getUserId(data)).then(function(user) {
      this.recosForUser(user.id).then(function(recos) {
        //TODO DO SOMETHING
      });
    }, function() {
      alert("USER NOT EXIST");
    })
  }

  generateUser(rfid) {
    return new Promise((resolve, reject) => {
      this.addUser({
        id: rfid,
        rfid: rfid,
        firstname: fk.name.firstName(),
        lastname: fk.name.lastName(),
        birthdate: moment(fk.date.past()).format('YYYY-MM-DD')
      }).then(resolve)
    })
  }

  generateRecos(user) {
    const total = Math.random() * 10
    const locations = [
      'Clinical Research',
      'Xray',
      'Radiology',
      'Oncology'
    ]
    let r = []
    for(let i = 0; i < total; i++) {
      r.push({
        appointmentname:`Dr. ${fk.name.lastName()}`,
        appointmentime: moment(fk.date.future()).format('HH:mm:A'),
        appointmentlocation: _.sample(locations)
      })
    }
    this.addRecommendations(user, r)
  }

  addRecommendations(user, reco) {
    this.fbRecos(user.id).once('value').then((snapshot) => {
      var recos = snapshot.val() || [];
      recos.push(...reco);
      this.fbRecos(user.id).set(recos);
    });
  }

  addUser(user) {
    return new Promise((resolve) => {
      this.fbUsers(user.id).set(user).then(function() {
        resolve(user);
      })
    })
  }

}

export default new FB()
