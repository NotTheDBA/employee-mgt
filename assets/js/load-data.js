$(document).ready(function() {
    //this initializes a global object called "Hoods"
    //It contains just a list of neighborhood names
    // use:
    // Hoods.List[0]  - gets the name of neighborhood
    getList();

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
    getMapData();


    // This button is necessary to access the data 
    // - we can't just load the data on page launch for some reason
    makeLoadButton("load")

});


function makeLoadButton(label) {

    var button = $("<button>").text(label).addClass("btn btn-primary btn-block");
    button.on("click", function() {

        console.log(Object.keys(Hoods.List).length);
        // console.log(Hoods);
        // console.log(Hoods.List); 
        // console.log(Hoods.List[10]);

        console.log(Object.keys(Philly).length);
        // console.log(Philly);
        // console.log(Philly[10]);
        // console.log(Philly[10].Neighborhood);

        console.log(Object.keys(MapData.Map).length);
        // console.log(MapData);
        // console.log(MapData.Map);
        // console.log(MapData.Map[0]);
        // console.log(MapData.Map[0].properties);
        // console.log(MapData.Map[0].properties.listname);

        console.log(MapData.Map[0].geometry.coordinates);
    });

    $("#loader").empty().append(button);
}

function getcount() {
    return Object.keys(MapData.Neighborhoods.Map).length;
}


function getList() {
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

function getMapData() {
    // Only needs to run once on load.
    var queryurl = "assets/data/n1.geojson";
    $.ajax({
        url: queryurl,
        dataType: 'json',
        method: "GET"
    }).then(function(jsonData) {
        //puts the data in our global space
        window.MapData = jsonData;
        // console.log(jsonData);
    });

}