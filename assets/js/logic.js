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

    window.NeighborResults = [];
    console.log(NeighborResults);
 
 });
 
 $("#results-page").ready(function() {
    var link = window.location.href;
    var url = new URL(link);
    var c = url.searchParams.get("Income");
 
    var startIncome = (parseInt(c) - 5000);
    var endIncome = (parseInt(c) + 5000);
 
    var hoodsRef = database.ref("Geo").child("hoods");
 
    hoodsRef.orderByChild("median-income").startAt(startIncome).endAt(endIncome).on("child_added", function(snapshot) {
        // debugger
        window.NeighborResults.push(snapshot.val());
    });
 
 
 });


var neighborhoods;


// Initial Values 
var firstVar = "";

// Whenever a user clicks the submit-bid button
$("#findIncome").on("click", function (event) {
    // Prevent form from submitting
    event.preventDefault();
    window.location.replace("Results2.html?Income=" + $("#exampleInput1").val())
    // console.log("Results.html?name="+ $("#exampleInput1").val())

    //****window.location.href

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

$("#package").on("click", function (event) {
    // Prevent form from submitting
    event.preventDefault();
    var geoName = "PENNYPACK_PARK";
    window.location.replace("Details.html?package=" + geoName);



});