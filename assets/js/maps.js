function initMap() {

    // var options = {
    //     zoom: 12,
    //     center: { lat: 39.9526, lng: -75.1652 },
    // }
    // var map = new google.maps.Map(document.getElementById("maps"), options);

    $(window).on('load', function() {


        var panorama = new google.maps.StreetViewPanorama(
            document.getElementById('maps'), {
                position: { lat: 39.9817, lng: -75.1281 },
                pov: {
                    heading: 34,
                    pitch: 0
                }
            });
        maps.StreetViewPanorama(panorama);
    });
}

//        

//     });

// $("#old").on('click', function () {

//     var marker = new google.maps.Marker({
//         position: { lat: 39.9521, lng: -75.1407 },
//         map: map,
//         //icon :
//     });
//     var panorama = new google.maps.StreetViewPanorama(
//         document.getElementById('pano'), {
//             position: { lat: 39.9521, lng: -75.1407 },
//             pov: {
//                 heading: 34,
//                 pitch: 0
//             }
//         });
//     map.setStreetView(panorama);
//     map.panTo(position);

// });

// $("#powel").on('click', function () {

//     var marker = new google.maps.Marker({
//         position: { lat: 39.9610, lng: -75.1917 },
//         map: map,
//         //icon :
//     });
//     var panorama = new google.maps.StreetViewPanorama(
//         document.getElementById('pano'), {
//             position: { lat: 39.9610, lng: -75.1917 },
//             pov: {
//                 heading: 34,
//                 pitch: 0
//             }
//         });
//     map.setStreetView(panorama);
//     map.panTo(position);
// });

//         // function toggleMarker() {
//         //     var toggle = marker.getVisible();
//         //     if ('click' == false) {
//         //         marker.setVisible(true);
//         //     } else {
//         //         marker.setVisible(false);
//         //     }
//         // }

//             //kensington
//             // addMarks({ lat: 39.9817, lng: -75.1281 });
//             // //Old City
//             // addMarks({ lat: 39.9521, lng: -75.1407 });
//             // //Powelton Village
//             // addMarks({ lat: 39.9610, lng: -75.1917 });



//             // function addMarks() {
//             //     var marker = new google.maps.Marker({
//             //         position: { lat: 39.9817, lng: -75.1281 },
//             //         map: map,
//             //         //icon :

//             //     });
//             // }

//             // marker.addListener('click',function(){

//             //     https://maps.googleapis.com/maps/api/streetview?size=600x300&location=46.414382,10.013988&heading=151.78&pitch=-0.76&key=YOUR_API_KEY;
//             //     var panorama = new google.maps.Panorama(document.getElementById("streetView"), options);

//             // });
//         }


$("#details-page").ready(function() {
    var link = window.location.href;
    var url = new URL(link);
    var c = url.searchParams.get("package");
    console.log(c);

    var hoodsRef = database.ref("Geo").child("hoods");
    var findGeoName = url.searchParams.get("package");

    hoodsRef.orderByChild("geoname").equalTo(findGeoName).on("child_added", function(snapshot) {
        // console.log(snapshot.val());

        var geo = snapshot.child("geometry").val();

        // console.log(geo);
        // console.log(geo.coordinates[0]);

        $.each(snapshot, function() {

            $("#cityName").text(snapshot.child("listname").val());
            var income = snapshot.child("median-income").val();
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