//$('.navbar').effect('shake', {}, 500)

let currentCourse;
let currentId;
let teeType;

let totalPar;

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
        playerModal.show();
    }

}

$(".playerButton").on("click", function (event) {
    currentCourse = allCourses.getCourse(currentId);
    console.log(currentCourse);
    playerError.hide();
    let uniqueNames = true;
    let playerNames = [player1.val(), player2.val(), player3.val(), player4.val()];
    let newPlayers = [];
    for (let i = playerNames.length + 1; i == 0; i--) {
        if (!playerNames[i]) {
            playerNames.splice(i, 1);
        }
    }
    for (let i = 0; i < playerNames.length; i++) {
        let name1 = playerNames[i];
        if (playerNames.length == 1) {
            newPlayers.push(name1);
            break;
        }
        if (name1) {
            for (let i2 = 0; i2 < playerNames.length; i2++) {
                let name2 = playerNames[i2];
                if (i2 != i && name2) {
                    if (name2 == name1) {
                        console.log("breaking");
                        uniqueNames = false;
                        playerError.show();
                        break;
                    } else {}
                }
            }
            newPlayers.push(name1);
        } else {
            console.log("No name input for player " + (i + 1).toString());
        }
    }
    if (uniqueNames == true && newPlayers.length > 0) {
        console.log("Creating new players");
        allPlayers.removeAll();
        newPlayers.forEach((v, i) => {
            allPlayers.addPlayer(v);
        })
        currentCourse.loadScorecard();
        playerModal.hide();
        allPlayers.Collection.forEach((v, i) => {
            //console.log(i,v);

        })
    } else {
        console.log("Non unique or empty players");
    }
});

function calcTotals(plrName, type, element) {
    if (!isNaN(Number(element.innerHTML))) {
        let playerRow = $(`${"#"+plrName}`);
        let cells = playerRow[0].cells;
        let totalScore = 0;
        switch (type) {
            case "OUT":
                for (let i = 1; i < 10; i++) { //Calc OUT score
                    if (cells[i].innerHTML != "") {
                        totalScore += Number(cells[i].innerHTML);
                    }
                }
                $(`${"#"+plrName+"OUT"}`).html(totalScore);
                break;
            case "IN":
                for (let i = 11; i < 20; i++) { //Calc IN score
                    if (cells[i].innerHTML != "") {
                        totalScore += Number(cells[i].innerHTML);
                    }
                }
                $(`${"#"+plrName+"IN"}`).html(totalScore);
                break;
        }
        if (cells[10].innerHTML != "" && cells[20].innerHTML != "") {
            let finalScore = 0;
            finalScore = Number(cells[10].innerHTML) + Number(cells[20].innerHTML);
            $(`${"#"+plrName+"TOTAL"}`).html(finalScore);
        }
    }else{
        console.log("Element had a non number");
        $(element).html("");
    }
}

function resetAll() {
    console.log("reset all");
    currentCourse = null;
    currentId = null;
    teeType = null;
    totalPar = null;
    $(".golfScorecardDiv").remove(); //clear any current scorecards
    allPlayers.removeAll();
    playerModal.hide();
    courseDiv.show();
}