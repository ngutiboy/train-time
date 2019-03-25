$( document ).ready(function() {
    
    var config = {
        apiKey: "AIzaSyDyTBs-pp00nYZlvaY9maglSroObGAlgsQ",
        authDomain: "steps-project-f812e.firebaseapp.com",
        databaseURL: "https://steps-project-f812e.firebaseio.com",
        projectId: "steps-project-f812e",
        storageBucket: "steps-project-f812e.appspot.com",
        messagingSenderId: "520241532810"
      };
      firebase.initializeApp(config);
      var database=firebase.database();
      
//      

$("#addTrainBtn").on("click", function(){
  event.preventDefault();

  // Grabs user input and assign to variables
  var trainName = $("#trainNameInput").val().trim();
  var destination = $("#destinationInput").val().trim();
  var trainTimeInput = moment($("#trainTimeInput").val().trim(), "HH:mm").subtract(10, "years").format("X");;
  var frequencyInput = $("#frequencyInput").val().trim();

  // Test for variables entered
  console.log(trainName);
  console.log(destination);
  console.log(trainTimeInput);
  console.log(frequencyInput);

  // Creates local "temporary" object for holding train data
  
  var newTrain = {
    name:  trainName,
    destination: destination,
    trainTime: trainTimeInput,
    frequency: frequencyInput,
  }

  // pushing trainInfo to Firebase
  database.ref().push(newTrain);
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.trainTime);
    console.log(newTrain.frequency)
  

  // clear text-boxes
  $("#trainNameInput").val("");
  $("#destinationInput").val("");
  $("#trainInput").val("");
  $("#frequencyInput").val("");

  // Prevents page from refreshing
  return false;
});

database.ref().on("child_added", function(childSnapshot, prevChildKey){

  console.log(childSnapshot.val());

  // assign firebase variables to snapshots.
  var firebaseName = childSnapshot.val().name;
  
  var firebaseDestination = childSnapshot.val().destination;
  var firebaseTrainTimeInput = childSnapshot.val().trainTime;
  var firebaseFrequency = childSnapshot.val().frequency;
  
  var diffTime = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes");
  var timeRemainder = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes") % firebaseFrequency ;
  var minutes = firebaseFrequency - timeRemainder;

  var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A"); 
  
  // Test for correct times and info
  console.log(minutes);
  console.log(nextTrainArrival);
  console.log(moment().format("hh:mm A"));
  console.log(nextTrainArrival);
  console.log(moment().format("X"));

  // Append train info to table on page
  $("#trainTable > tbody").append("<tr><td>" + firebaseName + "</td><td>" + firebaseDestination + "</td><td>" + firebaseFrequency + " mins" + "</td><td>" + nextTrainArrival + "</td><td>" + minutes + "</td></tr>");

});
});


    
  