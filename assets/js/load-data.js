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


    //this initializes a second global object called "Philly"
    // use:
    // Philly[10] - Get all neighborhood data
    // Philly[10].Name - gets the name of neighborhood
    getData();


    //this initializes a third global object called "MapData"
    // use:
    // MapData.Map[0] - Get all neighborhood data
    // MapData.Map[0].properties.listname - gets the name of neighborhood
    // MORE IMPORTANTLY - It includes geoJson data needed to draw maps on Google.
    // https://stackoverflow.com/questions/38491370/how-to-add-geojsonmultilinestring-layer-to-a-google-map
    //http://zevross.com/blog/2014/04/01/google-maps-api-adds-geojson-support-here-is-an-example/
    //  Here's how to get an array of coordinates for one neighborhood:
    // MapData.Map[0].geometry.coordinates
    // getMapData();

    // This button is necessary to access the data 
    // - we can't just load the data on page launch for some reason

    $("#loader").empty();
    makeLoadButton("load");
    makeQueryIncomeButton();
    makeQueryMapButton();

});

// TODO: Clay: use this example data query to find neighborhoods with income in a range.
function makeQueryIncomeButton() {

    var button = $("<button>").text("Query Income").addClass("btn btn-primary btn-block");
    button.on("click", function() {

        var hoodsRef = database.ref("Philly").child("hoods");
        var startIncome = "$25,000"
        var endIncome = "$30,000"

        window.NeighborResults = [];

        hoodsRef.orderByChild("median-income").startAt(startIncome).endAt(endIncome).on("child_added", function(snapshot) {
            window.NeighborResults.push(snapshot.val());
        });

        console.log(NeighborResults);
    });

    $("#loader").append(button);
}


// TODO: Kush: Use this example data query to pull geodata coordinates
function makeQueryMapButton() {

    var button = $("<button>").text("Query Map Data").addClass("btn btn-primary btn-block");
    button.on("click", function() {

        var hoodsRef = database.ref("Geo").child("hoods");
        var placeName = "PENNYPACK_PARK"

        window.GeoResults = [];

        hoodsRef.orderByChild("name").equalTo(placeName).on("child_added", function(snapshot) {
            window.GeoResults.push(snapshot.val());
        });

        console.log(GeoResults);
    });

    $("#loader").append(button);
}


function makeLoadButton(label) {

    var button = $("<button>").text(label).addClass("btn btn-primary btn-block");
    button.on("click", function() {
        // loadList();
        // loadIncomes();
        // verifyCounts();
        getMapData();
    });

    $("#loader").append(button);
}

function verifyCounts() {
    // return Object.keys(MapData.Neighborhoods.Map).length;

    // console.log(Object.keys(Hoods.List).length);
    // console.log(Hoods);
    // console.log(Hoods.List); 
    // console.log(Hoods.List[10]);

    console.log(Object.keys(Philly).length);
    // console.log(Philly);
    // console.log(Philly[10]);
    // console.log(Philly[10].Name);
    // console.log(Philly[10]["Median household income in 2016"]);
    // console.log(Philly[10]["Median household income in 2016"][Philly[10].Name]);

    console.log(Object.keys(MapData.Map).length);
    // console.log(MapData);
    // console.log(MapData.Map);
    // console.log(MapData.Map[0]);
    // console.log(MapData.Map[0].properties);
    // console.log(MapData.Map[0].properties.listname);

    // console.log(MapData.Map[0].geometry.coordinates);
}


function loadList() {
    //this initializes a global object called "Hoods"
    //It contains just a list of neighborhood names
    // use:
    // Hoods.List[0]  - gets the name of neighborhood

    // Only needs to run once on load.
    var queryurl = "assets/data/neighborhoods-list.json";
    $.ajax({
        url: queryurl,
        dataType: 'json',
        method: "GET"
    }).then(function(jsonData) {
        //puts the data in our global space
        window.Hoods = jsonData;
        // console.log(jsonData);
        // database.ref("Hoods").child("List").push(Hoods.List)
        database.ref("Hoods").child("List").remove()
        database.ref("Hoods").child("List").set(Hoods.List)
    });

}


function loadIncomes() {

    var queryurl = "assets/data/n1.json";
    $.ajax({
        url: queryurl,
        dataType: 'json',
        method: "GET"
    }).then(function(jsonData) {
        //puts the data in our global space
        window.Philly = jsonData;

        database.ref("Philly").remove()
        var hoodsRef = database.ref("Philly").child("hoods");

        var hoodCount = 0;
        Philly.forEach(thisHood => {
            if (typeof thisHood["Median household income in 2016"] !== 'undefined') {
                hoodsRef.child(hoodCount).child("name").set(thisHood.Name)
                hoodsRef.child(hoodCount).child("median-income").set(thisHood["Median household income in 2016"][thisHood.Name])
                hoodCount += 1;
            }

        });


        // hoodsRef.child(10).child("name").set(thisHood.Name)
        // hoodsRef.child(10).child("median-income").set(thisHood["Median household income in 2016"][thisHood.Name])

        // database.ref("Philly").child("hoods").child(10).child("name").set(Philly[10].Name)
        // database.ref("Philly").child("hoods").child(10).child("median-income").set(Philly[10]["Median household income in 2016"][Philly[10].Name])

        // console.log(Philly[10].Name);
        // // console.log(Philly[10]["Median household income in 2016"]);
        // console.log(Philly[10]["Median household income in 2016"][Philly[10].Name]);
        // console.log(jsonData);
    });


}


function getData() {
    // Only needs to run once on load.
    var queryurl = "assets/data/n1.json";
    $.ajax({
        url: queryurl,
        dataType: 'json',
        method: "GET"
    }).then(function(jsonData) {
        //puts the data in our global space
        window.Philly = jsonData;
        // console.log(jsonData);
    });

    // "Read more": "http": "//www.city-data.com/nbmaps/neigh-Philadelphia-Pennsylvania.html#N154#ixzz5AFDwsicQ"


}

// TODO: Merge this data with income data for searching.
function getMapData() {
    // Only needs to run once on load.
    var queryurl = "assets/data/n1.geojson";
    $.ajax({
        url: queryurl,
        dataType: 'json',
        method: "GET"
    }).then(function(jsonData) {
        //puts the data in our global space
        // window.MapData = jsonData;
        // console.log(jsonData);
        // console.log(jsonData.Map[0].geometry.coordinates);

        database.ref("Geo").remove()
        var hoodsRef = database.ref("Geo").child("hoods");

        var hoodCount = 0;
        jsonData.Map.forEach(thisHood => {
            // // console.log(thisHood);
            // console.log(thisHood.properties.name);
            // console.log(thisHood.properties.listname);
            // console.log(thisHood.geometry.coordinates);
            hoodsRef.child(hoodCount).child("name").set(thisHood.properties.name);
            hoodsRef.child(hoodCount).child("listname").set(thisHood.properties.listname);
            hoodsRef.child(hoodCount).child("geometry").child("coordinates").set(thisHood.geometry.coordinates[0][0]);
            hoodCount += 1;
        })

        // database.ref("Geo").child("List").remove()
        // database.ref("Geo").child("List").set(jsonData.Map)


    });

}