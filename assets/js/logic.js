// Initialize Firebase
var config = {
    apiKey: "AIzaSyA7sNWS4IJJGYoqukX2Xp-EhDB39OqD36I",
    authDomain: "find-my-spot-philly.firebaseapp.com",
    databaseURL: "https://find-my-spot-philly.firebaseio.com",
    projectId: "find-my-spot-philly",
    storageBucket: "",
    messagingSenderId: "818602970975"
};

firebase.initializeApp(config);
// Create a variable to reference the database
var database = firebase.database();

// Assign the reference to the database to a variable named 'database'
// var database = ...

// Initial Values 
var firstVar = "";


// --------------------------------------------------------------
database.ref().on("child_added", function(childSnapshot) {

    // Log everything that's coming out of snapshot 
    console.log(childSnapshot.val());


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
    $("#employee-name").text(snapshot.val());
});

// --------------------------------------------------------------

// Whenever a user clicks the submit-bid button
$("#add-employee").on("click", function(event) {
    // Prevent form from submitting
    event.preventDefault();

    // // Get the input values
    // employeeRate = parseInt($("#employee-rate").val());
    // employeeName = $("#employee-name").val();

    firstVar = $("#employee-name").val();

    // if (employeeRate > highrate) {
    // Save the new employee in Firebase
    database.ref().push({
        myVar: firstVar,
        created: firebase.database.ServerValue.TIMESTAMP

    })

    // } else {
    //     // Alert
    //     alert("Sorry that bid is too low. Try again.");
    // }

});