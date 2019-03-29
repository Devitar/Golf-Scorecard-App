class AllCourses{
    constructor(){

    }
}

class Course{
    constructor(){

    }
}

class Player{
    constructor(){

    }
}

class PlayerCollection{
    constructor(){
        this.Collection = [];
    }
    addPlayer(){
        this.Collection.push(new Player());
    }
}

var allPlayers = new PlayerCollection();