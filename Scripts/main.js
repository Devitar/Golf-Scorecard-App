//$('.navbar').effect('shake', {}, 500)

let currentCourse;
let teeType;

let tableG = $(".golfScorecard");
let playerModal = $(".modalPlayers");
let courseDiv = $(".courseDiv");

//Player input
let player1 = $("#player1");
let player2 = $("#player2");
let player3 = $("#player3");
let player4 = $("#player4");

let playerError = $("#playerErrorText");
//

//Modal, initial load
let mainModal = $(".modal");
let closeModal = $("#closeModal");
let loadingGif = $("#loadingGif");
$("#loadingGif").ready(function () {
    showModal();
    loadingGif.css('width', loadingGif.height());
    // getCourses();
    allCourses.loadInitialData();
});

function showModal() {
    mainModal.fadeIn(300);
}

function hideModal() {
    mainModal.fadeOut(300);
}
//

function returnCourse(courseid, mybtn) {
    allCourses.loadCourse(courseid, mybtn);
}

function setTee(value, id) {
    console.log(value, id);
    if (value != "None") {
        courseDiv.hide();
        //Load scorecard here
        playerModal.show();

        //tableG.show();

    }

}

$(".playerButton").on("click", function(event){
    //console.log(event);
    let uniqueNames = [false, false, false, false];
    let playerNames = [player1.val(), player2.val(), player3.val(), player4.val()];
    playerNames.forEach((v,i) => {
        if (v){
            console.log(v);
        } else {
            console.log("No name input for player " + (i+1).toString());
        }
        
    })
    uniqueNames.forEach((v,i) => {
        for (let i = 0; i < uniqueNames.length; i++){

        }
    });
    playerError.show();
});