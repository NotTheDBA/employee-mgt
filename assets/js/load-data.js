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

var dbRef = "Geo";
// var dbRef = "Philly";  // DB test space

$(document).ready(function() {

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
    // loadMapData();

    // This button is necessary to access the data 
    // - we can't just load the data on page launch for some reason

    $("#loader").empty();
    makeLoadButton("load");
    makeQueryIncomeButton();
    makeQueryMapButton();

});


function makeLoadButton(label) {

    var button = $("<button>").text(label).addClass("btn btn-primary btn-block");
    button.on("click", function() {
        console.log("Begin loading...")
            // loadList();
            // verifyCounts();
        loadMapData();
        console.log("Loading complete.")
    });

    $("#loader").append(button);
}


// TODO: Clay: use this example data query to find neighborhoods with income in a range.
function makeQueryIncomeButton() {

    var button = $("<button>").text("Query Income").addClass("btn btn-primary btn-block");
    button.on("click", function() {

        var hoodsRef = database.ref(dbRef).child("hoods");
        var startIncome = 25000
        var endIncome = 30000

        window.NeighborResults = [];

        hoodsRef.orderByChild("median-income").startAt(startIncome).endAt(endIncome).on("child_added", function(snapshot) {
            window.NeighborResults.push(snapshot.val());
            var link = ""

            $.each(snapshot, function() {
                var block = $("<div class='block-panel'>");
                block.append("<div class='row' </div>");
                block.append("<div class='bundleClick col-xl-6'>");
                block.append("<a " + "href='Details.html?package=" + snapshot.child("geoname").val() + "'" + ">");
                block.append("<img class='product-item-img mx-auto d-flex rounded img-fluid mb-3 mb-lg-0' src='img/Fairmount.jpg' alt='Philly Skyline'" +
                    "style='width:400px;height:300px;'>");
                block.append("</a>");
                block.append("<a class='bundleTitle' " + "href='Details.html?package=" + snapshot.child("geoname").val() + "'" + "></a>");
                $(".bundleTitle").text("City Name : " + snapshot.child("listname").val());
                block.append("<br>");
                block.append("<a class='bundleDescription' " + "href='Details.html?package=" + snapshot.child("geoname").val() + "'" + ">Feel at home in " + snapshot.child("listname").val() + "!</a>");
                block.append("</a>");

                $(".packagePanel").append(block);
            });

        });

        console.log(NeighborResults);
    });

    $("#loader").append(button);
}


// TODO: Kush: Use this example data query to pull geodata coordinates
function makeQueryMapButton() {

    var button = $("<button>").text("Query Map Data").addClass("btn btn-primary btn-block");
    button.on("click", function() {

        var hoodsRef = database.ref(dbRef).child("hoods");
        var findGeoName = "PENNYPACK_PARK"

        window.GeoResults = [];

        hoodsRef.orderByChild("geoname").equalTo(findGeoName).on("child_added", function(snapshot) {
            window.GeoResults.push(snapshot.val());
        });

        console.log(GeoResults);
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
    // console.log(Philly[10].geoname);
    // console.log(Philly[10]["Median household income in 2016"]);
    // console.log(Philly[10]["Median household income in 2016"][Philly[10].geoname]);

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

        var hoodsRef = database.ref(dbRef).child("hoods");

        Philly.forEach(thisHood => {
            // console.log(thisHood);

            var namedHood = hoodsRef.child(thisHood.geoname);
            // console.log(thisHood.geoname);/

            if (typeof thisHood["Median household income in 2016"] !== 'undefined') {
                var income = thisHood["Median household income in 2016"]["This neighborhood"].trim()
                income = income.replace("$", "").replace(",", "")
                    // console.log(parseInt(income));

                namedHood.child("median-income").set(parseInt(income))
            }
            if (typeof thisHood["Median rent in 2016"] !== 'undefined') {
                namedHood.child("median-rent").set(thisHood["Median rent in 2016"]["This neighborhood"].trim())
            }


            if (typeof thisHood["Male_vs_Females"] !== 'undefined') {

                // console.log(thisHood["Male_vs_Females"]);

                // console.log(thisHood["Most common occupations of males"]);
                namedHood.child("Male_vs_Females").child("males").child("population").set(thisHood["Male_vs_Females"]["Males"]);
                namedHood.child("Male_vs_Females").child("males").child("median_age").set(thisHood["Median age"]["Males"]);
                namedHood.child("Male_vs_Females").child("males").child("occupations").set(thisHood["Most popular occupations of males"]);

                namedHood.child("Male_vs_Females").child("females").child("population").set(thisHood["Male_vs_Females"]["Females"]);
                namedHood.child("Male_vs_Females").child("females").child("median_age").set(thisHood["Median age"]["Males"]);
                namedHood.child("Male_vs_Females").child("females").child("occupations").set(thisHood["Most popular occupations of females"]);

            }

            if (typeof thisHood["Housing prices"] !== 'undefined') {

                if (typeof thisHood["Median rent in 2016"] !== 'undefined') {
                    namedHood.child("median-rent").set(thisHood["Median rent in 2016"]["This neighborhood"].trim())

                }
            }

        }, function(error) {
            // The Promise was rejected.
            console.error(error);
        });

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
function loadMapData() {
    // Only needs to run once on load.
    var queryurl = "assets/data/n1.geo.json";
    $.ajax({
        url: queryurl,
        dataType: 'json',
        method: "GET"
    }).then(function(jsonData) {
        //puts the data in our global space
        // window.MapData = jsonData;
        // console.log(jsonData);
        // console.log(jsonData.Map[0].geometry.coordinates);

        // database.ref("Hoods").remove()
        database.ref(dbRef).remove()
        var hoodsRef = database.ref(dbRef).child("hoods");

        var hoodCount = 0;
        jsonData.Map.forEach(thisHood => {
            var namedHood = hoodsRef.child(thisHood.properties.geoname);
            // console.log(thisHood);
            // console.log(thisHood.properties.geoname);
            // console.log(thisHood.properties.listname);
            // console.log(thisHood.geometry.coordinates);

            namedHood.child("listname").set(thisHood.properties.listname.trim());
            namedHood.child("geoname").set(thisHood.properties.geoname.trim());
            namedHood.child("geometry").child("coordinates").set(thisHood.geometry.coordinates[0][0]);
            hoodCount += 1;
        })

        // database.ref(dbRef).child("List").remove()
        // database.ref(dbRef).child("List").set(jsonData.Map)

        loadIncomes();

    });

}