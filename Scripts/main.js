//$('.navbar').effect('shake', {}, 500)

let currentCourse;
let teeType;

//Modal, initial load
let mainModal = $(".modal");
let closeModal = $("#closeModal");
let loadingGif = $("#loadingGif");
$("#loadingGif").ready(function(){
    showModal();
    loadingGif.css('width', loadingGif.height());
    // getCourses();
    allCourses.loadInitialData();
});

function showModal(){
    mainModal.fadeIn(300);
}
function hideModal(){
    mainModal.fadeOut(300);
}
//

function returnCourse(courseid, mybtn) {
    allCourses.loadCourse(courseid, mybtn);
}

function setTee(value){
    console.log(value);
}

function loadCourse(obj){
    console.log(obj);
};