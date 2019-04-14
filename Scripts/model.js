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
    '                <th>TOTAL</th>' +
    '            </thead>' +
    '            <tbody id="tBody">' +
    '                <tr id="yardsRow">' +
    '                    <th>Yards</th>' +
    '                </tr>' +
    '                <tr id="handicapRow">' +
    '                    <th>Handicap</th>' +
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
    loadScorecard() {
        $(".golfScorecardDiv").remove(); //clear any current scorecards
        $("body").append(scoreCardBase); //Add new scorecard
        let holes = this.Info.data.holes;
        let holeData = [];
        holes.forEach((v,i) => {
            let teeBox;
            for (let i = 0; i < v.teeBoxes.length; i++){
                let box = v.teeBoxes[i];
                if (box.teeType == teeType){
                    teeBox = box;
                    break;
                }
            }
            holeData.push({"TeeBox": teeBox, "Par": teeBox.par, "Yardage": teeBox.yards, "Handicap": teeBox.hcp});
        })
        //load yardage
        let yardsOut = 0;
        let yardsIn = 0;
        for (let i = 1; i < 10; i++) { //Add OUT yardage
            let hole = holeData[i-1];
            $("#yardsRow").append(`<td id="${"YardsHole"+i}" class="tableData">${hole.Yardage}</td>`);
            yardsOut += hole.Yardage;
        }
        $("#yardsRow").append(`<td id="YardsOUT" class="tableDataBold">${yardsOut}</td>`);

        for (let i = 10; i < 19; i++) { //Add IN yardage
            let hole = holeData[i-1];
            $("#yardsRow").append(`<td id="${"YardsHole"+i}" class="tableData">${hole.Yardage}</td>`);
            yardsIn += hole.Yardage;
        }
        $("#yardsRow").append(`<td id="YardsIN" class="tableDataBold">${yardsIn}</td>`);
        $("#yardsRow").append(`<td id="YardsTOTAL" class="tableDataBold">${yardsIn+yardsOut}</td>`);
        //
        //load handicap
        let hcpOut = 0;
        let hcpIn = 0;
        for (let i = 1; i < 10; i++) { //Add OUT yardage
            let hole = holeData[i-1];
            $("#handicapRow").append(`<td id="${"hcpHole"+i}" class="tableData">${hole.Handicap}</td>`);
            hcpOut += hole.Handicap;
        }
        $("#handicapRow").append(`<td id="hcpOUT" class="tableDataBold">${hcpOut}</td>`);

        for (let i = 10; i < 19; i++) { //Add IN yardage
            let hole = holeData[i-1];
            $("#handicapRow").append(`<td id="${"hcpHole"+i}" class="tableData">${hole.Handicap}</td>`);
            hcpIn += hole.Handicap;
        }
        $("#handicapRow").append(`<td id="hcpIN" class="tableDataBold">${hcpIn}</td>`);
        $("#handicapRow").append(`<td id="hcpTOTAL" class="tableDataBold">${hcpIn+hcpOut}</td>`);
        //
        allPlayers.Collection.forEach((v, i) => {
            $("#tBody").append(`<tr id="${v.Name}"><th>${v.Name}</th></tr>`); //Add player row
            for (let i = 1; i < 10; i++) { //Add OUT score boxes
                $(`${"#"+v.Name}`).append(`<td id="${v.Name+i}" class="plrScoreData" contenteditable="true" onblur="calcTotals('${v.Name}', 'OUT', this)"></td>`);
            }
            $(`${"#"+v.Name}`).append(`<td id="${v.Name+"OUT"}" class="plrScoreDataTOTAL">0</td>`);
            for (let i = 10; i < 19; i++) { //Add OUT score boxes
                $(`${"#"+v.Name}`).append(`<td id="${v.Name+i}" class="plrScoreData" contenteditable="true" onblur="calcTotals('${v.Name}', 'IN', this)"></td>`);
            }
            $(`${"#"+v.Name}`).append(`<td id="${v.Name+"IN"}" class="plrScoreDataTOTAL">0</td>`);
            $(`${"#"+v.Name}`).append(`<td id="${v.Name+"TOTAL"}" class="plrScoreDataTOTAL">0</td>`);
        })
        //load par
        $("#tBody").append(`<tr id="parRow"><th>Par</th></tr>`); //Add par row
        let parOut = 0;
        let parIn = 0;
        for (let i = 1; i < 10; i++) { //Add OUT par
            let hole = holeData[i-1];
            $("#parRow").append(`<td id="${"parHole"+i}" class="tableData">${hole.Par}</td>`);
            parOut += hole.Par;
        }
        $("#parRow").append(`<td id="parOUT" class="tableDataBold">${parOut}</td>`);

        for (let i = 10; i < 19; i++) { //Add IN par
            let hole = holeData[i-1];
            $("#parRow").append(`<td id="${"parHole"+i}" class="tableData">${hole.Par}</td>`);
            parIn += hole.Par;
        }
        $("#parRow").append(`<td id="parIN" class="tableDataBold">${parIn}</td>`);
        totalPar = parIn+parOut;
        $("#parRow").append(`<td id="parTOTAL" class="tableDataBold">${totalPar}</td>`);
        //
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
    getCourse(id) {
        let found;
        this.Collection.forEach((v, i) => {
            if (v.ID == id.toString()) {
                found = v;
            }
        })
        if (!found) {
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
    removeAll() {
        this.Collection = [];
    }
}

var allPlayers = new PlayerCollection();
var allCourses = new AllCourses();