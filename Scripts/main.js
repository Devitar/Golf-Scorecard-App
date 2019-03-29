var courses;

getAllCourses();

function getAllCourses() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            courses = JSON.parse(this.responseText);
            initialize();
        }
    };
    xhttp.open("GET", "https://golf-courses-api.herokuapp.com/courses", true);
    xhttp.setRequestHeader("ContentType", "application/json");
    xhttp.send();
}

function initialize(){
    console.log("Started code. ", courses);
}