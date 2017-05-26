var appointmentTemplate = _.template('<div class="row"><div class="col-sm-4" style="background-color:#f2f2f2"><h4>Your appointment today is with</h4><p><%= appointmentname %></p><br><h4>The appointment is at</h4><p><%= appointmentime %></p><br><h4>Please follow the map to</h4><p><%= appointmentlocation %></p><br></div><div class="col-sm-8" style="background-color:transparent;"><img src="img/UHW-map-<%= appointmentlocation %>.jpg" class="img-rounded" alt=“UHW-map” width=“700” height=“267”></div></div><hr/>');

var config = {
  apiKey: "AIzaSyDZ0OWlMS5-0t4t6JMMsrw5-sUGwwK69Vw",
  authDomain: "beacon-a0f64.firebaseapp.com",
  databaseURL: "https://beacon-a0f64.firebaseio.com",
  projectId: "beacon-a0f64",
  storageBucket: "beacon-a0f64.appspot.com",
  messagingSenderId: "260036500893"
};
firebase.initializeApp(config);

var myFirebase = firebase.database().ref();

var usersRef = 'users/all';
var recoRef = 'appointments/all';

var hash = function(str) {
  var hash = 5381,
      i    = str.length;

  while(i) {
      hash = (hash * 33) ^ str.charCodeAt(--i);
        }

    /* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
     *    * integers. Since we want the results to be always positive, convert the
     *       * signed int to an unsigned by doing an unsigned bitshift. */
    return hash >>> 0;
};

var formToObj = function(form) {
  return _.reduce(form.serializeArray(), function(memo, num){
    memo[num.name] = s(num.value).clean().toLowerCase().value();
    return memo;
  }, {});
}

var userDataFromObj = function(data) {
  return _(data).pick('firstname', 'lastname', 'birthdate');
}

var getUserId = function(user) {
  var stringId = _(userDataFromObj(user)).chain()
    .values()
    .value()
    .join('');
  return hash(stringId);
}

var addUser = function(user) {
  user.id = getUserId(user);
  var fbUsers = myFirebase.child(usersRef + "/" + user.id);
  fbUsers.once('value').then(function(snapshot) {
      if(!snapshot.val()) {
        fbUsers.set(user).then(function() {
          window.location = "index.html";
        });
      }
    });
}

var getUser = function(id) {
  var fbUsers = myFirebase.child(usersRef + "/" + id);
  return new Promise(function(resolve, reject) {
    fbUsers.once('value').then(function(snapshot) {
        var r = snapshot.val();
        if(r) {
          resolve(r);
        } else {
          reject();
        }
      });
  });
}

var getOrCreateUser = function(data) {
  var id = getUserId(data);
  return new Promise(function(resolve, reject) {
    getUser(id).then(resolve, function() {
      var user = userDataFromObj(data);
      user.id = id;
      fbUsers.set(user).then(function() {
        resolve(user);
      });
    });
  });
}

var recosForUser = function(id) {
  var fbRecos = myFirebase.child(recoRef);
  return new Promise(function(resolve, reject) {
    fbRecos.once('value').then(function(snapshot) {
      var recos = snapshot.val() || [];
      resolve(recos);
    });
  });
}

var checkRecos = function(data) {
  getUser(getUserId(data)).then(function(user) {
    recosForUser(user.id).then(function(recos) {
      var tpl = "";
      for (let reco of recos) {
        tpl += appointmentTemplate(reco);
      }
      $('#content').html(tpl);
    });
  }, function() {
    alert("USER NOT EXIST");
  })
}

var addRecommendation = function(reco) {
  getOrCreateUser(reco).then(function(user) {
    var fbRecos = myFirebase.child(recoRef);
    var recoData = _(reco).omit('firstname', 'lastname', 'birthdate')
    recoData.userId = user.id;
    fbRecos.once('value').then(function(snapshot) {
      var recos = snapshot.val() || [];
      recos.push(recoData);
      fbRecos.set(recos);
    });
  });
}

var userForm = $('#user-form');
var recommendationForm = $("#recommendationForm");

userForm.on('submit', function(e) {
  e.preventDefault();
  checkRecos(formToObj(userForm));
})

recommendationForm.submit(function(e) {
  e.preventDefault();
  addRecommendation(formToObj(recommendationForm));
});
