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
var database = firebase.database();

$(document).ready(function() {

});

// Whenever a user clicks the submit-bid button
$("#findIncome").on("click", function(event) {
    // Prevent form from submitting
    event.preventDefault();
    window.location.replace("Results.html?Income=" + $("#exampleInput1").val())
        // console.log("Results.html?name="+ $("#exampleInput1").val())

});

// // Initialize Firebase
// var config = {
//     apiKey: "AIzaSyA7sNWS4IJJGYoqukX2Xp-EhDB39OqD36I",
//     authDomain: "find-my-spot-philly.firebaseapp.com",
//     databaseURL: "https://find-my-spot-philly.firebaseio.com",
//     projectId: "find-my-spot-philly",
//     storageBucket: "",
//     messagingSenderId: "818602970975"
// };

// firebase.initializeApp(config);
// // Create a variable to reference the database
// var database = firebase.database();
// var g_geo
// $(document).ready(function() {
//     //this initializes a global object called "neighborhoods"
//     // use:
//     // neighborhoods.list[0].value()
//     loadData();


//     console.log(neighborhoods);

// });
// var neighborhoods;

// function loadData() {
//     // Only needs to run once on load.
//     var queryurl = "assets/data/neighborhoods-list.json";
//     $.ajax({
//         url: queryurl,
//         dataType: 'json',
//         method: "GET"
//     }).then(function(jsonData) {
//         //puts the data in our global space
//         window.neighborhoods = jsonData;
//     });

// }

// // Initial Values 
// var firstVar = "";

// // Whenever a user clicks the submit-bid button
// $("#findIncome").on("click", function(event) {
//     // Prevent form from submitting
//     event.preventDefault();
//     window.location.replace("Results.html?Income=" + $("#exampleInput1").val())

//     //****window.location.href

//     // // // Get the input values
//     // // employeeRate = parseInt($("#employee-rate").val());
//     // // employeeName = $("#employee-name").val();

//     // firstVar = $("#employee-name").val();

//     // // if (employeeRate > highrate) {
//     // // Save the new employee in Firebase
//     // database.ref().push({
//     //     myVar: firstVar,
//     //     created: firebase.database.ServerValue.TIMESTAMP

//     // })

//     // } else {
//     //     // Alert
//     //     alert("Sorry that bid is too low. Try again.");
//     // }

// });

// $("#results-page").ready(function() {
//     var link = window.location.href;
//     var url = new URL(link);
//     var c = url.searchParams.get("Income");
//     console.log(c);

//     var button = $("<button>").text("Query Income").addClass("btn btn-primary btn-block");
//     button.on("click", function() {

//         var hoodsRef = database.ref("Philly").child("hoods");
//         var startIncome = "Income" - 5000
//         var endIncome = "Income" + 5000

//         window.NeighborResults = [];

//         hoodsRef.orderByChild("median-income").startAt(startIncome).endAt(endIncome).on("child_added", function(snapshot) {
//             window.NeighborResults.push(snapshot.val());
//         });

//         console.log(NeighborResults);

//     });
// });

// $("#package").on("click", function(event) {
//     // Prevent form from submitting
//     event.preventDefault();
//     var geoName = "PENNYPACK_PARK";
//     window.location.replace("Details.html?package=" + geoName);



// });

// $("#details-page").ready(function() {
//     var link = window.location.href;
//     var url = new URL(link);
//     var c = url.searchParams.get("package");
//     console.log(c);

//     var hoodsRef = database.ref("Geo").child("hoods");
//     var findGeoName = url.searchParams.get("package");

//     // window.GeoResults = [];

//     // hoodsRef.orderByChild("geoname").equalTo(findGeoName).on("child_added", function(snapshot) {
//     //     window.GeoResults.push(snapshot.val());
//     // });

//     // console.log(GeoResults);
//     // $.each(GeoResults,function(index,value){
//     //     $("#cityName").text("City Name :" + this.listname);
//     // });  
//     // 

//     hoodsRef.orderByChild("geoname").equalTo(findGeoName).on("child_added", function(snapshot) {
//         console.log(snapshot.val());

//         var g_geo = snapshot.child("geometry").val();

//         console.log(g_geo);
//         console.log(g_geo.coordinates[0]);
//         console.log(g_geo.coordinates[0][1]);
//         var coOrdinates = [{ lat: g_geo.coordinates[0][1], lng: g_geo.coordinates[0][0] },
//             { lat: g_geo.coordinates[1][1], lng: g_geo.coordinates[1][0] },
//             { lat: g_geo.coordinates[2][1], lng: g_geo.coordinates[2][0] },
//             { lat: g_geo.coordinates[3][1], lng: g_geo.coordinates[3][0] }
//         ];

//         var map = new google.maps.Polygon({
//             paths: coOrdinates,
//             strokeColor: '#FF0000',
//             strokeOpacity: 0.8,
//             strokeWeight: 2,
//             fillColor: '#FF0000',
//             fillOpacity: 0.35
//         });



//         $.each(snapshot, function() {

//             $("#cityName").text(snapshot.child("listname").val());
//             $("#medianIncome").text(snapshot.child("median-income").val());
//             $("#medianRent").text(snapshot.child("median-rent").val());
//             $("#femaleAge").text(snapshot.child("Male_vs_Females").child("females").child("median_age").val());
//             $("#maleAge").text(snapshot.child("Male_vs_Females").child("males").child("median_age").val());
//             $("#femalePop").text(snapshot.child("Male_vs_Females").child("females").child("population").val());
//             $("#malePop").text(snapshot.child("Male_vs_Females").child("males").child("population").val());
//             $("#femaleOcp").text(snapshot.child("Male_vs_Females").child("females").child("occupations").val());
//             $("#maleOcp").text(snapshot.child("Male_vs_Females").child("males").child("occupations").val());
//         });


//         //     function initMap() {

//         //         var options = {
//         //             zoom: 12,
//         //             center: { lat: g_geo.coordinates[0][1], lng: g_geo.coordinates[0][0] },
//         //         }
//         //         var map = new google.maps.Map(document.getElementById("maps"), options);



//         //            console.log(g_geo);

//         //            var panorama = new google.maps.StreetViewPanorama(
//         //                document.getElementById('maps'), {
//         //                    position: { lat: g_geo.coordinates[0][1], lng: g_geo.coordinates[0][0] },
//         //                    pov: {
//         //                        heading: 34,
//         //                        pitch: 0
//         //                    }

//         //                });
//         //                map.setStreetViewPanorama(panorama);
//         //    }

//     });

// });