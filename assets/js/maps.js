// Initialize Firebase
var config = {
    apiKey: "AIzaSyA7sNWS4IJJGYoqukX2Xp-EhDB39OqD36I",
    authDomain: "find-my-spot-philly.firebaseapp.com",
    databaseURL: "https://find-my-spot-philly.firebaseio.com",
    projectId: "find-my-spot-philly",
    storageBucket: "",
    messagingSenderId: "818602970975"
};

var g_geo;

firebase.initializeApp(config);
// Create a variable to reference the database
var database = firebase.database();

$("#details-page").ready(function() {
    var link = window.location.href;
    var url = new URL(link);
    var c;
    if (url.searchParams.get("package") === null) {
        c = "CENTER_CITY";
    } else {
        c = url.searchParams.get("package");
    }

    var hoodsRef = database.ref("Geo").child("hoods");
    var findGeoName = url.searchParams.get("package");

    hoodsRef.orderByChild("geoname").equalTo(findGeoName).on("child_added", function(snapshot) {
        console.log(snapshot.val());

        var g_geo = snapshot.child("geometry").val();

        console.log(g_geo);

        var coOrdinates = [{ lat: g_geo.coordinates[0][1], lng: g_geo.coordinates[0][0] },
            { lat: g_geo.coordinates[1][1], lng: g_geo.coordinates[1][0] },
            { lat: g_geo.coordinates[2][1], lng: g_geo.coordinates[2][0] },
            { lat: g_geo.coordinates[3][1], lng: g_geo.coordinates[3][0] }
        ];

        var map = new google.maps.Polygon({
            paths: coOrdinates,
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35
        });



        $.each(snapshot, function() {

            $("#cityName").text(snapshot.child("listname").val());
            var income = snapshot.child("median-income").val()
            income = "$" + income.formatMoney(2);
            $("#medianIncome").text(income);
            $("#medianRent").text(snapshot.child("median-rent").val());
            $("#femaleAge").text(snapshot.child("Male_vs_Females").child("females").child("median_age").val());
            $("#maleAge").text(snapshot.child("Male_vs_Females").child("males").child("median_age").val());
            $("#femalePop").text(snapshot.child("Male_vs_Females").child("females").child("population").val());
            $("#malePop").text(snapshot.child("Male_vs_Females").child("males").child("population").val());
            $("#femaleOcp").text(snapshot.child("Male_vs_Females").child("females").child("occupations").val());
            $("#maleOcp").text(snapshot.child("Male_vs_Females").child("males").child("occupations").val());
        });

    });

});


Number.prototype.formatMoney = function(c, d, t) {
    var n = this,
        c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};