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

    var link = window.location.href;
    var url = new URL(link);
    var findGeoName = url.searchParams.get("package");
    console.log(findGeoName);


    var hoodsRef = database.ref("Geo").child("hoods");

    window.GeoResults = [];

    hoodsRef.orderByChild("geoname").equalTo(findGeoName).on("child_added", function(snapshot) {
        window.GeoResults.push(snapshot.val());
    });

    console.log(GeoResults);
});