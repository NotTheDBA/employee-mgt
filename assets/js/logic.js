// Initialize Firebase
var config = {
    apiKey: "***REMOVED***",
    authDomain: "find-my-spot-philly.firebaseapp.com",
    databaseURL: "https://find-my-spot-philly.firebaseio.com",
    projectId: "find-my-spot-philly",
    storageBucket: "",
    messagingSenderId: "***REMOVED***"
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