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

let allcats;
let selcourse;
let seltype;

getCourses();

//Modal
let mainModal = $(".modal");
let closeModal = $("#closeModal");
$(function (){
    mainModal.fadeIn(1000);
});

closeModal.on("click", function (){
    mainModal.fadeOut(300);
})
//

function getCourses() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            allcats = JSON.parse(this.responseText);
            allcats.categories.forEach((v, i) => {
                let newItem = `<div id="${v.catid}" class="courseContainer">` +
                    `<img src="${v.courseimage}" class="courseImg"/>` +
                    `<div>` + v.name + `</div>` +
                    `<button onclick="returnCourse(${v.catid}, this)" class="courseButton">More Info</button>` +
                    `</div>`;
                $(".centerbox").append(newItem);
            });
        }
    }
    xhttp.open("GET", "https://golf-courses-api.herokuapp.com/courses", true);
    xhttp.send();
}

function returnCourse(courseid, mybtn) {
    let thecard = $(mybtn).parent();
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
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

function showAllClasses(typeindex) {
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