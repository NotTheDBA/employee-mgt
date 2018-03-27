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

// Whenever a user clicks the submit-bid button
$("#findIncome").on("click", function(event) {
    // Prevent form from submitting
    event.preventDefault();
    window.location.replace("Results.html?Income=" + $("#exampleInput1").val())

});

$("#results-page").ready(function() {

    doNothing();

    var hoodsRef = database.ref("Geo").child("hoods");
    var startIncome = "$25,000"
    var endIncome = "$30,000"

    window.NeighborResults = [];

    console.log("starting load...");
    hoodsRef.orderByChild("median-income").startAt(startIncome).endAt(endIncome).on("child_added", function(snapshot) {
        window.NeighborResults.push(snapshot.val());
    });
    console.log("loading complete...");
    console.log(NeighborResults);
});


$("#details-page").ready(function() {

    doNothing();


    var hoodsRef = database.ref("Geo").child("hoods");
    var findGeoName = "PENNYPACK_PARK"

    window.GeoResults = [];

    hoodsRef.orderByChild("geoname").equalTo(findGeoName).on("child_added", function(snapshot) {
        window.GeoResults.push(snapshot.val());
    });

    console.log(GeoResults);
});

function doNothing() {

}



$("#package").on("click", function(event) {
    // Prevent form from submitting
    event.preventDefault();

    doNothing();

    var geoName = "PENNYPACK_PARK";
    window.location.replace("Details.html?package=" + geoName);



});