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

$("#results-page").ready(function() {
    var link = window.location.href;
    var url = new URL(link);
    var c = url.searchParams.get("Income");

    var startIncome = (parseInt(c) - 2500);
    var endIncome = (parseInt(c) + 2500);

    var hoodsRef = database.ref(dbRef).child("hoods");

    window.NeighborResults = [];

    hoodsRef.orderByChild("median-income").startAt(startIncome).endAt(endIncome).on("child_added", function(snapshot) {
        $(".packagePanel").empty()
        window.NeighborResults.push(snapshot.val());

        NeighborResults.forEach(snapshot => {

            var block = $("<div class='block-panel' id='" + snapshot.geoname + "'>");

            var link = "href='Details.html?package=" + snapshot.geoname + "'" +
                block.append("<div class='row' </div>");
            block.append("<div class='bundleClick col-xl-6'>");
            block.append("<a " + link + ">");
            block.append("<img class='product-item-img mx-auto d-flex rounded img-fluid mb-3 mb-lg-0' src='img/Fairmount.jpg' alt='Philly Skyline'" +
                "style='width:400px;height:300px;'>");
            block.append("</a>");
            block.append(("<a class='bundleTitle' " + link + ">City Name : " + snapshot.listname + "</a>"));
            // $(".bundleTitle").text();
            block.append("<br>");
            block.append("<a class='bundleDescription' " + link + ">Feel at home in " + snapshot.listname + "!</a>");
            block.append("</a>");

            $(".packagePanel").append(block);
        });
    });

    // console.log(NeighborResults);

});