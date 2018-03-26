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

$(document).ready(function() {
    //this initializes a global object called "neighborhoods"
    // use:
    // neighborhoods.list[0].value()
    loadData();


    console.log(neighborhoods);

});
var neighborhoods;

function loadData() {
    // Only needs to run once on load.
    var queryurl = "assets/data/neighborhoods-list.json";
    $.ajax({
        url: queryurl,
        dataType: 'json',
        method: "GET"
    }).then(function(jsonData) {
        //puts the data in our global space
        window.neighborhoods = jsonData;
    });

}

// Initial Values 
var firstVar = "";

// Whenever a user clicks the submit-bid button
$("#findIncome").on("click", function(event) {
    // Prevent form from submitting
    event.preventDefault();
    window.location.replace("Results.html?name=Income&name="+ $("#exampleInput1").val())

   

    // // // Get the input values
    // // employeeRate = parseInt($("#employee-rate").val());
    // // employeeName = $("#employee-name").val();

    // firstVar = $("#employee-name").val();

    // // if (employeeRate > highrate) {
    // // Save the new employee in Firebase
    // database.ref().push({
    //     myVar: firstVar,
    //     created: firebase.database.ServerValue.TIMESTAMP

    // })

    // } else {
    //     // Alert
    //     alert("Sorry that bid is too low. Try again.");
    // }

});