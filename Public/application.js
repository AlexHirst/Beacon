// TODO: Replace with your project's config object. You can find this
// by navigating to your project's console overview page
// (https://console.firebase.google.com/project/your-project-id/overview)
// and clicking "Add Firebase to your web app"
 var config = {
    apiKey: "AIzaSyDZ0OWlMS5-0t4t6JMMsrw5-sUGwwK69Vw",
    authDomain: "beacon-a0f64.firebaseapp.com",
    databaseURL: "https://beacon-a0f64.firebaseio.com",
    projectId: "beacon-a0f64",
    storageBucket: "beacon-a0f64.appspot.com",
    messagingSenderId: "260036500893"
  };

// Initialize your Firebase app
firebase.initializeApp(config);

// Reference to your entire Firebase database
var myFirebase = firebase.database().ref();

// Get a reference to the recommendations object of your Firebase.
// Note: this doesn't exist yet. But when we write to our Firebase using
// this reference, it will create this object for us!
var recommendations = myFirebase.child("visitors");

// Save a new recommendation to the database, using the input in the form
var submitRecommendation = function () {

  // Get input values from each of the form elements
  var card = $("#vistorID").val();
  var first = $("#firstName").val();
  var last = $("#lastName").val();
  var date = $("#dateBirth").val();
  var appointment = $("#appointmentName").val();
  var time = $("#appointmentTime").val();
  var location = $("#appointmentLocation").val();


  // Push a new recommendation to the database using those values
  recommendations.push({
    "idvisit": card,
    "idfirst": first,
    "idlast": last,
    "iddate": date,
    "idappointment": appointment,
    "idtime": time,
    "idlocation": location
  });
};

// When the window is fully loaded, call this function.
// Note: because we are attaching an event listener to a particular HTML element
// in this function, we can't do that until the HTML element in question has
// been loaded. Otherwise, we're attaching our listener to nothing, and no code
// will run when the submit button is clicked.
$(window).load(function () {

  // Find the HTML element with the id recommendationForm, and when the submit
  // event is triggered on that element, call submitRecommendation.
  $("#recommendationForm").submit(submitRecommendation);

});