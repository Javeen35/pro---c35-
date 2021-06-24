var ball;
var database;
var position;

function setup(){
    database = firebase.database();
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    //.ref is used to refer to a particular property in the database
    //.on is a listener, it is used to listen to changes in the referred property
    //if there is a change the function after "value", is executed
    var ballPosition= database.ref('square/position');
    ballPosition.on("value", readPosition, showError);
}

function draw(){
    background("white");
    //not equal to !==
    if(position !== undefined)
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}



function writePosition(x,y){
    //.set is used to set a value in the database
    database.ref('square/position').set({ 
        'x': position.x + x, 
        'y': position.y + y
    });

}

function readPosition(data){
    //the changed data is stored in a variable position.
    position = data.val();
    ball.x = position.x;
    ball.y = position.y;
}

function showError(){

    console.log("this is how an error in database will look like");
}