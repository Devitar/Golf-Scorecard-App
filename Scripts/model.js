class Course {
    constructor(id, name, index) {
        this.Name = name;
        this.ID = id;
        this.Index = index;
    }
}

class AllCourses {
    constructor() {
        this.mainCourses = [];
        this.Collection = [];
    }
    loadInitialData() {
        let xhttp = new XMLHttpRequest();
        let mainObj = this;
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                hideModal();
                let coursesParsed = JSON.parse(this.responseText);
                console.log(coursesParsed);
                coursesParsed.courses.forEach((v, i) => {
                    mainObj.mainCourses.push({
                        "Name": v.name,
                        "id": v.id
                    })
                    let newItem = `<div id="${v.id}" class="courseContainer card">` +
                        `<img src="${v.image}" class="courseImg card-img-top" alt="Course Image" />` +
                        `<div class="card-body">` +
                        `<p class="card-text">` + v.name + `</p>` +
                        `<button onclick="returnCourse(${v.id}, this)" class="courseButton">More Info</button>` +
                        `</div>` +
                        `</div>`;
                    $(".courseDiv").append(newItem);
                });
            }
        }
        xhttp.open("GET", "https://golf-courses-api.herokuapp.com/courses", true);
        xhttp.send();
    }
    loadCourse(courseid, mybtn) {
        showModal();
        let xhttp = new XMLHttpRequest();
        let mainObj = this;
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                hideModal();
                let selcourse = JSON.parse(this.responseText);
                let newCourse = new Course(selcourse.data.id, selcourse.data.name, mainObj.Collection.length);
                mainObj.Collection.push(newCourse);
                // let teeBoxArray = [];
                // let dropDownMenu = `<select id="${selcourse.data.id}" class="dropdownMenu" onchange="setTee(value)">`

                // console.log(selcourse);
                // let teesArray = selcourse.data.holes[0].teeBoxes;
                // teesArray.forEach((v, i) => {
                //     if (v.teeType != "auto change location") { //Excludes the auto distance tee (unsure what it is)
                //         let teeType = v.teeType;
                //         let newString = teeType.charAt(0).toUpperCase() + teeType.slice(1);
                //         teeBoxArray.push(`<option value="${teeType}">${newString}</option>`)
                //     };
                // });
                // teeBoxArray.forEach((v, i) => {
                //     dropDownMenu += v;
                // });
                // dropDownMenu += "</select>";
                // $(`#${courseid}`).append(dropDownMenu);
                
                $(mybtn).hide();
                return newCourse;
            }
        }
        xhttp.open("GET", "https://golf-courses-api.herokuapp.com/courses/" + courseid, true);
        xhttp.send();
    }
}

class Player {
    constructor(name) {
        this.Name = name;
    }
}

class PlayerCollection {
    constructor() {
        this.Collection = [];
    }
    addPlayer(name) {
        this.Collection.forEach((v, i) => {
            if (v.Name != name) {
                let newPlayer = new Player(name);
                this.Collection.push(newPlayer);
                return newPlayer;
            } else {
                return false;
            }
        });

    }
}

var allPlayers = new PlayerCollection();
var allCourses = new AllCourses();