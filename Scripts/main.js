// var courses;

// getAllCourses();

// function getAllCourses() {
//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function () {
//         if (this.readyState == 4 && this.status == 200) {
//             courses = JSON.parse(this.responseText);
//             initialize();
//         }
//     };
//     xhttp.open("GET", "https://golf-courses-api.herokuapp.com/courses", true);
//     xhttp.setRequestHeader("ContentType", "application/json");
//     xhttp.send();
// }

// function initialize(){
//     console.log("Started code. ", courses);
// }

$('.navbar').effect('shake', {}, 500)

let allcats;
let selcourse;
let seltype;

//Modal
let mainModal = $(".modal");
let closeModal = $("#closeModal");
let loadingGif = $("#loadingGif");
$("#loadingGif").ready(function(){
    showModal();
    loadingGif.css('width', loadingGif.height());
    getCourses();
});

function showModal(){
    mainModal.fadeIn(300);
}
function hideModal(){
    mainModal.fadeOut(300);
}
//

function getCourses() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            hideModal();
            allcats = JSON.parse(this.responseText);
            allcats.courses.forEach((v, i) => {
                let newItem = `<div id="${v.catid}" class="courseContainer">` +
                    `<img src="${v.image}" class="courseImg"/>` +
                    `<div>` + v.name + `</div>` +
                    `<button onclick="returnCourse(${v.id}, this)" class="courseButton">More Info</button>` +
                    `</div>`;
                $(".centerbox").append(newItem);
            });
        }
    }
    xhttp.open("GET", "https://golf-courses-api.herokuapp.com/courses", true);
    xhttp.send();
}

function returnCourse(courseid, mybtn) {
    showModal();
    let thecard = $(mybtn).parent();
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            hideModal();
            selcourse = JSON.parse(this.responseText);
            let levelsArray = selcourse.classes[0].levels;
            levelsArray.forEach((v, i) => {
                $(thecard).append(`<a onclick="showAllClasses(${i})">${levelsArray[i].type}</a>`);
            })
        }
    }
    xhttp.open("GET", "https://golf-courses-api.herokuapp.com/courses/" + courseid, true);
    xhttp.send();
}

function showAll(typeindex) {
    seltype = typeindex;
    $(".classRow").remove();
    selcourse.classes.forEach((v, i) => {
        $(".classdisp").append(`<div class="classRow">
            <div>${v.levels[seltype].type}</div>
            <div>${v.levels[seltype].teacher}</div>
            <div>${v.levels[seltype].schedule}</div>
        </div>`);
    });
};