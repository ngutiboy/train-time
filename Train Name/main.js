$(document).ready(function () {
    var config = {
        apiKey: "AIzaSyDvBQhGbwOS2TYxhACab2XthXMc8WJa6MY",
        authDomain: "new-train-project-5ebcb.firebaseapp.com",
        databaseURL: "https://new-train-project-5ebcb.firebaseio.com",
        projectId: "new-train-project-5ebcb",
        storageBucket: "",
        messagingSenderId: "574131511676"
      };
      firebase.initializeApp(config);
    var database = firebase.database()


    $("#button-click").on("click", function (event) {
        //Prevent Default

        event.preventDefault()

        //set user input values to variables
        var trainName = $("#train-name").val().trim();

        var destination = $("#destination").val().trim()


        //converts user input to usable info

        var firstTrainTime = moment($("#first-train-time").val().trim(), "hh:mm").subtract(1, "years");
        
        var frequency = $("#frequency").val().trim()

        // local "temporary" object for holding new train data
        var newTrain = {
            train: trainName,
            trainGoing: destination,
            trainComing: firstTrainTime,
            everyXMin: frequency
        };

        // Uploads train data to the database        
        database.ref().push(newTrain);
        console.log(newTrain.train);
        console.log(newTrain.trainGoing);
        console.log(newTrain.trainComing);
        console.log(newTrain.nextArrival);

        //clears elements before adding new text
        $("#train-name").val("");
        $("#destination").val("");
        $("#first-train-time").val("");
        $("#frequency").val("");
    });

    // Create Firebase event for adding train infor to the database and a row in the html when an entry is added

    database.ref().on("child_added", function(childSnapshot, prevChildKey) {
        if (childSnapshot) {            
            // store in variables
            var trainName = childSnapshot.val().train;
            var destination = childSnapshot.val().trainGoing;
            var firstTrainTime = childSnapshot.val().trainComing;
            var frequency = childSnapshot.val().everyXMin;
    
            // log in train infor
            console.log(trainName);
            console.log(destination);
            console.log(firstTrainTime);
            console.log(frequency);

            
   


            // make train infor neater
            var trainTime = moment.unix(firstTrainTime).format("hh:mm");
            console.log(trainTime);
            // calculate time difference
            currentTime = moment();
            console.log("CURRENT TIME:" +moment(currentTime).format("hh:mm"));
            //difference between times
            var difference = moment().diff(moment(trainTime), "minutes");
            console.log("TIME DIFFERENCE:" + difference);
            // calculate time apart(remainder)
            var trainRemain = difference % frequency;
            console.log(trainRemain);
            // calculate munites until train arrival
            var minutesAway = frequency - trainRemain;
            console.log("MINUTES AWAY: " + minutesAway);
            //Next train arrival time
            var nextArrival = moment().add(minutesAway, "minutes");
            console.log("NEXT ARRIVAL: " + moment(nextArrival).format("hh:mm"));
    
            // Add to the DOM
            let tr = $("<tr>").append(
                $("<td>").text(trainName),
                $("<td>").text(destination),
                $("<td>").text(frequency),
                $("<td>").text(nextArrival),
                $("<td>").text(minutesAway)
            );
    
            $("#train-table > tbody").append(tr);
        }
    })
})












