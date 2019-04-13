//$('.navbar').effect('shake', {}, 500)

let currentCourse;
    let currentId;
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
        teeType = value;
        currentId = id;
        courseDiv.hide();
        //Load scorecard here
        playerModal.show();

        //tableG.show();

    }

}

$(".playerButton").on("click", function(event){
    currentCourse = allCourses.getCourse(currentId);
    console.log(currentCourse);
    playerError.hide();
    let uniqueNames = true;
    let playerNames = [player1.val(), player2.val(), player3.val(), player4.val()];
    let newPlayers = []; 
    for (let i = playerNames.length + 1; i > 0; i--){
        if (!playerNames[i]){
            playerNames.splice(i,1);
        }
    }
    for (let i = 0; i < playerNames.length; i++){
        let name1 = playerNames[i];
        if (playerNames.length == 1) {
            newPlayers.push(name1);
            break;
        }
        if (name1){
            for (let i2 = 0; i2 < playerNames.length; i2++){
                let name2 = playerNames[i2];
                if (i2 != i && name2){
                    if (name2 == name1){
                        console.log("breaking");
                        uniqueNames = false;
                        playerError.show();
                        break;
                    } else {
                    }
                }
            }
            newPlayers.push(name1);
        } else {
            console.log("No name input for player " + (i+1).toString());
        }
    }
    if (uniqueNames == true){
        console.log("Creating new players");
        allPlayers.removeAll();
        newPlayers.forEach((v,i) => {
            allPlayers.addPlayer(v);
            console.log(v);
        })
        currentCourse.loadScorecard();
        playerModal.hide();
        allPlayers.Collection.forEach((v,i) => {
            //console.log(i,v);

        })
    }else{
        console.log("Non unique");
    }
});