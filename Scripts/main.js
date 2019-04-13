//$('.navbar').effect('shake', {}, 500)

let currentCourse;
let teeType;

let tableG = $(".golfScorecard");
let playerModal = $(".modalPlayers");
let courseDiv = $(".courseDiv");

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