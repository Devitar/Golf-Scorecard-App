let scoreCardBase = '<div class="container golfScorecardDiv">' +
    '        <table class="golfScorecard table table-striped">' +
    '            <thead>' +
    '                <th>Holes</th>' +
    '                <th>1</th>' +
    '                <th>2</th>' +
    '                <th>3</th>' +
    '                <th>4</th>' +
    '                <th>5</th>' +
    '                <th>6</th>' +
    '                <th>7</th>' +
    '                <th>8</th>' +
    '                <th>9</th>' +
    '                <th>OUT</th>' +
    '                <th>10</th>' +
    '                <th>11</th>' +
    '                <th>12</th>' +
    '                <th>13</th>' +
    '                <th>14</th>' +
    '                <th>15</th>' +
    '                <th>16</th>' +
    '                <th>17</th>' +
    '                <th>18</th>' +
    '                <th>IN</th>' +
    '            </thead>' +
    '            <tbody id="tBody">' +
    '                <tr id="yardsRow">' +
    '                    <th>Yards</th>' +
    '                </tr>' +
    '                <tr id="handicapRow">' +
    '                    <th>Handicap</th>' +
    '                </tr>' +
    '                <tr id="playerRow">' +
    '                </tr>' +
    '            </tbody>' +
    '        </table>' +
    '    </div>';



class Course {
    constructor(id, name, info) {
        this.Name = name;
        this.ID = id;
        this.Info = info;
    }
    loadScorecard(){
        $(".golfScorecardDiv").remove(); //clear any current scorecards
        $("body").append(scoreCardBase); //Add new scorecard
        //load yardage here
        //load handicap here
        allPlayers.Collection.forEach((v,i) => {
            $("#tBody").append(`<tr id="${v.Name}"><th>Player: ${v.Name}</th></tr>`); //Add player row
            for (let i = 1; i < 10; i++){ //Add OUT score boxes
                $(`${"#"+v.Name}`).append(`<td id="${v.Name+i}" class="plrScoreData" contenteditable="true" onblur="calcTotals('${v.Name}', 'OUT')"></td>`);
            }
            $(`${"#"+v.Name}`).append(`<td id="${v.Name+"OUT"}" class="plrScoreDataOUT">0</td>`);
            for (let i = 10; i < 19; i++){ //Add OUT score boxes
                $(`${"#"+v.Name}`).append(`<td id="${v.Name+i}" class="plrScoreData" contenteditable="true" onblur="calcTotals('${v.Name}', 'IN')"></td>`);
            }
            $(`${"#"+v.Name}`).append(`<td id="${v.Name+"IN"}" class="plrScoreDataOUT">0</td>`);
        })
        //load PAR here
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
                    let newItem = `<div id="${v.id}" class="courseContainer card col-8 col-md-4">` +
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
                let newCourse = new Course(selcourse.data.id, selcourse.data.name, selcourse);
                mainObj.Collection.push(newCourse);
                let teeBoxArray = [];
                let dropDownMenu = `<select id="${selcourse.data.id}" class="dropdownMenu" onchange="setTee(value, ${selcourse.data.id})">`
                teeBoxArray.push(`<option value="None">Select Tee</option>`)
                console.log(selcourse);
                let teesArray = selcourse.data.holes[0].teeBoxes;
                teesArray.forEach((v, i) => {
                    if (v.teeType != "auto change location") { //Excludes the auto distance tee (unsure what it is)
                        let teeType = v.teeType;
                        let newString = teeType.charAt(0).toUpperCase() + teeType.slice(1);
                        teeBoxArray.push(`<option value="${teeType}">${newString}</option>`)
                    };
                });
                teeBoxArray.forEach((v, i) => {
                    dropDownMenu += v;
                });
                dropDownMenu += "</select>";
                $(`#${courseid}`).append(dropDownMenu);

                $(mybtn).hide();
                return newCourse;
            }
        }
        xhttp.open("GET", "https://golf-courses-api.herokuapp.com/courses/" + courseid, true);
        xhttp.send();
    }
    getCourse(id){
        let found;
        this.Collection.forEach((v,i) => {
            if (v.ID == id.toString()){
                found = v;
            }
        })
        if (!found){
            return false;
        } else {
            return found;
        }
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
        let newPlayer = new Player(name);
        this.Collection.push(newPlayer);
        return newPlayer;
    }
    removeAll(){
        this.Collection = [];
    }
}

var allPlayers = new PlayerCollection();
var allCourses = new AllCourses();