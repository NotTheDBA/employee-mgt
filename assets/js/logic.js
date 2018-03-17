// Initialize Firebase
var config = {
    apiKey: "AIzaSyCwT5tPYY3WtYfyNlWmgRqHvBPgMn2Sy3s",
    authDomain: "employee-tracker-b587e.firebaseapp.com",
    databaseURL: "https://employee-tracker-b587e.firebaseio.com",
    projectId: "employee-tracker-b587e",
    storageBucket: "employee-tracker-b587e.appspot.com",
    messagingSenderId: "924425356946"
};

firebase.initializeApp(config);
// Create a variable to reference the database
var database = firebase.database();

// Assign the reference to the database to a variable named 'database'
// var database = ...

// Initial Values 
var initialEmployee = "No one :-(";

var employeeName = "";
var employeeRole = "";
var employeeRate = 0;

// --------------------------------------------------------------
database.ref().on("child_added", function(childSnapshot) {

    // Log everything that's coming out of snapshot 
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().role);
    console.log(childSnapshot.val().rate);
    console.log(childSnapshot.val().started);

    // // full list of items to the well
    // $("#full-member-list").append("<div class='well'><span class='member-name'> " + childSnapshot.val().name +
    //     " </span><span class='member-email'> " + childSnapshot.val().email +
    //     " </span><span class='member-age'> " + childSnapshot.val().age +
    //     " </span><span class='member-comment'> " + childSnapshot.val().comment + " </span></div>");

    // Handle the errors
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {

    // Change the HTML to reflect
    $("#employee-name").text(snapshot.val().name);
    $("#employee-role").text(snapshot.val().role);
    $("#employee-rate").text(snapshot.val().rate);
});

// --------------------------------------------------------------

// Whenever a user clicks the submit-bid button
$("#add-employee").on("click", function(event) {
    // Prevent form from submitting
    event.preventDefault();

    // // Get the input values
    // employeeRate = parseInt($("#employee-rate").val());
    // employeeName = $("#employee-name").val();

    employeeName = $("#employee-name").val();
    employeeRole = $("#employee-role").val();
    employeeRate = $("#employee-rate").val();
    // if (employeeRate > highrate) {
    // Save the new employee in Firebase
    database.ref().push({
        name: employeeName,
        role: employeeRole,
        rate: employeeRate,
        started: firebase.database.ServerValue.TIMESTAMP

    })

    //     // Store the new high rate and employee name as a local variable
    //     highrate = employeeRate
    //     highemployee = employeeName


    //     // Change the HTML to reflect the new high rate and employee
    //     $("#recent-employee").text(highemployee);
    //     $("#recent-rate").text(highrate);

    // } else {
    //     // Alert
    //     alert("Sorry that bid is too low. Try again.");
    // }

});