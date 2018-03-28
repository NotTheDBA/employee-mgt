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

// var NeighborResults = [];

//I would try something like this...   at the top of your snapshot function, clear the package panel...   Build your blocks in the for each to a local variable instead of directly to the package panel...  then append the local block to your package panel.   It will reload a lot, but should only give you one block per package.



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

        $.each(snapshot, function() {
            var block = $("<div class='block-panel' id='" + snapshot.child("geoname").val() + "'>");

            // var link = "href='Details.html?package=" + snapshot.child("geoname").val() + "'" +
            //     $(".packagePanel").append("<div class='row' </div>");
            // $(".packagePanel").append("<div class='bundleClick col-xl-6'>");
            // $(".packagePanel").append("<a " + link + ">");
            // $(".packagePanel").append("<img class='product-item-img mx-auto d-flex rounded img-fluid mb-3 mb-lg-0' src='img/fairmount.jpg' alt='Philly Skyline'" +
            //     "style='width:400px;height:300px;'>");
            // $(".packagePanel").append("</a>");
            // $(".packagePanel").append("<a class='bundleTitle' " + link + "></a>");
            // $(".bundleTitle").text("City Name : " + snapshot.child("listname").val());
            // $(".packagePanel").append("<br>");
            // $(".packagePanel").append("<a class='bundleDescription' " + link + ">Feel at home in " + snapshot.child("listname").val() + "!</a>");
            // $(".packagePanel").append("</a>");

            var link = "href='Details.html?package=" + snapshot.child("geoname").val() + "'" +
                block.append("<div class='row' </div>");
            block.append("<div class='bundleClick col-xl-6'>");
            block.append("<a " + link + ">");
            block.append("<img class='product-item-img mx-auto d-flex rounded img-fluid mb-3 mb-lg-0' src='img/fairmount.jpg' alt='Philly Skyline'" +
                "style='width:400px;height:300px;'>");
            block.append("</a>");
            block.append("<a class='bundleTitle' " + link + "></a>");
            $(".bundleTitle").text("City Name : " + snapshot.child("listname").val());
            block.append("<br>");
            block.append("<a class='bundleDescription' " + link + ">Feel at home in " + snapshot.child("listname").val() + "!</a>");
            block.append("</a>");

            $(".packagePanel").append(block);
        });

    });

    console.log(NeighborResults);
    // $(".packagePanel").empty()
    // snapshot.forEach(element => {
    //     $(".packagePanel").append(element.listname);
    // });

    // console.log(NeighborResults);

});



// $("#package").on("click", function(event) {
//     // Prevent form from submitting
//     event.preventDefault();
//     var geoName = "PENNYPACK_PARK";
//     window.location.replace("Details.html?package=" + geoName);



// });