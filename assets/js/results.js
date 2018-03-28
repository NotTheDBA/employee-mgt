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

var NeighborResults = [];

//I would try something like this...   at the top of your snapshot function, clear the package panel...   Build your blocks in the for each to a local variable instead of directly to the package panel...  then append the local block to your package panel.   It will reload a lot, but should only give you one block per package.



$("#results-page").ready(function() {
    var link = window.location.href;
    var url = new URL(link);
    var c = url.searchParams.get("Income");

    var startIncome = (parseInt(c) - 2500);
    var endIncome = (parseInt(c) + 2500);

    var hoodsRef = database.ref("Geo").child("hoods");

    hoodsRef.orderByChild("median-income").startAt(startIncome).endAt(endIncome).on("child_added", function(snapshot) {
        // debugger
        window.NeighborResults.push(snapshot.val());
        //I want to dynamically create packages based on the array
        // 
        // $(".bundleTitle").text("Philadelphia : " + snapshot.child("listname").val())
        $(".packagePanel").empty()



        $.each(snapshot, function() {
            var block = $("<div class='block-panel'>");

            var link = "href='Details.html?package=" + snapshot.child("geoname").val() + "'" +
                $(".packagePanel").append("<div class='row' </div>");
            $(".packagePanel").append("<div class='bundleClick col-xl-6'>");
            $(".packagePanel").append("<a " + link + ">");
            $(".packagePanel").append("<img class='product-item-img mx-auto d-flex rounded img-fluid mb-3 mb-lg-0' src='img/fairmount.jpg' alt='Philly Skyline'" +
                "style='width:400px;height:300px;'>");
            $(".packagePanel").append("</a>");
            $(".packagePanel").append("<a class='bundleTitle' " + link + "></a>");
            $(".bundleTitle").text("City Name : " + snapshot.child("listname").val());
            $(".packagePanel").append("<br>");
            $(".packagePanel").append("<a class='bundleDescription' " + link + ">Feel at home in " + snapshot.child("listname").val() + "!</a>");
            $(".packagePanel").append("</a>");

            $(".packagePanel").append(block);
        });

        $(".packagePanel").empty()
        snapshot.forEach(element => {
            $(".packagePanel").append(element.listname);
        });

        console.log(NeighborResults);

    });


});


// $("#package").on("click", function(event) {
//     // Prevent form from submitting
//     event.preventDefault();
//     var geoName = "PENNYPACK_PARK";
//     window.location.replace("Details.html?package=" + geoName);



// });