import * as firebase from 'firebase'
import _ from 'lodash'

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
  }

  fbUsers(id="") {
    return this.db.child(usersRef + "/" + id);
  }

  fbRecos() {
    return this.db.child(recoRef);
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

  addUser(user) {
    user.id = getUserId(user);
    this.fbUsers(user.id).once('value').then(function(snapshot) {
      if(!snapshot.val()) {
        this.fbUsers().set(user).then(function() {
          window.location = "index.html";
        });
      }
    });
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

  addRecommendation(reco) {
    this.getOrCreateUser(reco).then(function(user) {
      var recoData = _(reco).omit('firstname', 'lastname', 'birthdate')
        recoData.userId = user.id;
      this.fbRecos().once('value').then(function(snapshot) {
        var recos = snapshot.val() || [];
        recos.push(recoData);
        this.fbRecos().set(recos);
      });
    });
  }
}

export default new FB()
