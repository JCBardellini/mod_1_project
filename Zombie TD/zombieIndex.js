/* 
Welcome to my madness, breaking the codes in parts and sections to find help me navigate through the code fix the errors 
This will need to updated every time i create new code (might need to create new files if it gets too confusing)

Lines 10 - 14  ----- creating my canvas container and selecting the element from html, also setting the width and height
Lines 16 - 20  ----- are adding the background png i created of the map to the dimensions canvas
Lines 23 - 100 ----- Creating the background cells and obstacles for the images also finding the waypoints that the enemies will tavel
            Lines 36 - 55 --- the class "cell" making the grids in the game
            Lines 57 - 67 --- drawing the grid
            Lines 70 - 99 --- creating the obstacles 
    
*/
const canvasContainer = document.getElementById("canvas-container")
const canvas = document.querySelector("#canvas-board");
const ctx = canvas.getContext("2d");
canvas.width = 960;
canvas.height = 640;

// adding the background png to the canvas
const image = new Image(); // creates the img
image.src = "/Zombie-td-img/map.png";
image.onload = () => {
    ctx.drawImage(image, 0, 0);
};

// Game board set up
// this will guide in the creating in the path, obstacles and where i can place defenders

const cellSize = 32; // making each grid cell set to 32px
const cellGap = 5; // setting a gap of 2px between each cell 
const gameGrid = []; // Making an empty array, that will store all the cellSize + cellGap it creates, when creating the game

const controlsBar = {
    width: canvas.width,
    height: cellSize, 
};

// Making a "Cell" class with multiple methods that will help us in drawing the grids via js
// this will help us set up the obstacles in our maps too because we know what cells we need to block off

class Cell {
    // X-coordinate and y-coordinate
    constructor(x, y, isObstacle = false) {
        this.x = x; 
        this.y = y;
        this.width = cellSize;  // setting the width of each cell to 32px
        this.height = cellSize; // setting the height of each cell to 32px
        this.isObstacle = isObstacle; // adding the obstacle cell 
    };
    draw() { 
        // making an if/else statement for the cells to set up obstacles that we created in the map, this will guide us where we can place our defenders
        if (this.isObstacle) {
            ctx.fillStyle="red"; // fills the box
            ctx.fillRect(this.x, this.y, this.width /* should be = "this.width"*/, this.height); // change the width to help me see the map and index i need to be on to create obstacle 
        } else {
            ctx.strokeStyle = "black"; // gives me the outline of the box
            ctx.strokeRect(this.x, this.y, this.width, this.height); // x position, y position and dimensions of outline
        };
    };
};

// going to start creating each grid box
// It will begin creating grid from the top of the page and move down the x axis creating outline, after it reaches the end it will move the y axis one cell size and repeat the process again

const createGrid = () => {
    // moving down the Y axis
    for (let y = 0; y < canvas.height; y += cellSize) {
        // moving in the x axis 
        for (let x = 0; x < canvas.width; x += cellSize) {
            gameGrid.push(new Cell(x, y));
        };
    };
};
createGrid();
// obstacles in map
// created a for each loop that will assist me in turning certain index into obstacles depending on the index i put on the array.

const obstaclesInMap = [ 0, 1, 2, 3, 4, 11, 12, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 40, 41, 42, 43, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 90, 120, 360, 361, 390, 391, 80, 81, 73, 72, 71, 70, 598, 597, 599, 569, 568, 567 ]

obstaclesInMap.forEach( (index) => { 
    gameGrid[index].isObstacle = true
});
// a for loop to draw the cells in the game
const controlGrid = () => {
    for (let i = 0; i < gameGrid.length; i++) {
        gameGrid[i].draw();
    };
}; 

// Path waypoints
// This will help me create a path in my game grid 

const pathWayPoints = [
    {x: -150, y: 475}, 
    {x: 185, y: 475}, 
    {x: 185, y: 246}, 
    {x: 440, y: 246}, 
    {x: 440, y: 534}, 
    {x: 760, y: 534}, 
    {x: 760, y: 120}, 
    {x: 1000, y: 120}
];

// I was able to find my waypoints by drawing squares in the canvas that will help me determine where my enemy should go
// ctx.fillStyle = "blue"
// ctx.fillRect(203, 480, 32, 32);
// ctx.fillRect(203, 256, 32, 32)
// ctx.fillRect(460, 256, 32, 32)
// ctx.fillRect(460, 544, 32, 32)
// ctx.fillRect(780, 544, 32, 32)
// ctx.fillRect(780, 128, 32, 32)
// ctx.fillRect(1000, 128, 32, 32)



// create a mouseover and mouseleave event listener that will draw an outline that defenders can come using the game cell index

// creating the index of where the cells where we can put defenders

// I need to create a class called placement tiles, where i can put in the canvas 
const placementTiles = [
    { x: 0, y: 200 },
    { x: 0, y: 280 },
    { x: 0, y: 560 },
    { x: 80, y: 360 },
    { x: 80, y: 280 },
    { x: 80, y: 200 },
    { x: 123, y: 120 },
    { x: 40, y: 120 },
    { x: 80, y: 560 },
    { x: 205, y: 120 },
    { x: 150, y: 40 },
    { x: 375, y: 120 },
    { x: 460, y: 120 },
    { x: 165, y: 560 },
    { x: 290, y: 120 },
    { x: 235, y: 40 },
    { x: 245, y: 563 },
    { x: 330, y: 563 },
    { x: 290, y: 483 },
    { x: 340, y: 403 },
    { x: 290, y: 325 },
    { x: 865, y: 490 },
    { x: 865, y: 405 },
    { x: 865, y: 320 },
    { x: 865, y: 230 },
    { x: 650, y: 420 },
    { x: 550, y: 420 },
    { x: 650, y: 340 },
    { x: 550, y: 340 },
    { x: 650, y: 260 },
    { x: 550, y: 260 },
    { x: 650, y: 180 },
    { x: 550, y: 180 },
    { x: 650, y: 100 },
    { x: 550, y: 100 }
];

class Placement {
    constructor({position = {x: 0, y: 0} }) {
        this.position = position;
        this.size = 75;
        this.placementIndex = 0
        
    }
    draw() {
        ctx.fillStyle = "blue"
        ctx.fillRect(this.position.x, this.position.y, this.size, this.size)
    }
};

const placementObjects = placementTiles.map( (tile) => {
    new Placement(tile.x, tile.y)
});



// ctx.fillStyle = "blue"
// ctx.fillRect(0, 200, 75, 75)
// ctx.fillRect(0, 280, 75, 75)
// ctx.fillRect(0, 560, 75, 75)
// ctx.fillRect(80, 360, 75, 75)
// ctx.fillRect(80, 280, 75, 75)
// ctx.fillRect(80, 200, 75, 75)
// ctx.fillRect(123, 120, 75, 75)
// ctx.fillRect(40, 120, 75, 75)
// ctx.fillRect(80, 560, 75, 75)
// ctx.fillRect(205, 120, 75, 75)
// ctx.fillRect(150, 40, 75, 75)
// ctx.fillRect(375, 120, 75, 75)
// ctx.fillRect(460, 120, 75, 75)
// ctx.fillRect(165, 560, 75, 75)
// ctx.fillRect(290, 120, 75, 75)
// ctx.fillRect(235, 40, 75, 75)
// ctx.fillRect(245, 563, 75, 75)
// ctx.fillRect(330, 563, 75, 75)
// ctx.fillRect(290, 483, 75, 75)
// ctx.fillRect(340, 403, 75, 75)
// ctx.fillRect(290, 325, 75, 75)
// ctx.fillRect(865, 490, 75, 75)
// ctx.fillRect(865, 405, 75, 75)
// ctx.fillRect(865, 320, 75, 75)
// ctx.fillRect(865, 230, 75, 75)
// ctx.fillRect(650, 420, 75, 75)
// ctx.fillRect(550, 420, 75, 75)
// ctx.fillRect(650, 340, 75, 75)
// ctx.fillRect(550, 340, 75, 75)
// ctx.fillRect(650, 260, 75, 75)
// ctx.fillRect(550, 260, 75, 75)
// ctx.fillRect(650, 180, 75, 75)
// ctx.fillRect(550, 180, 75, 75)
// ctx.fillRect(650, 100, 75, 75)
// ctx.fillRect(550, 100, 75, 75)
// To check where to put my defenders I went checked creating a blue square in the img to see where to place it

// Defenders
const defender = []


// enemies

const enemyImg = new Image();
enemyImg.src = "/Zombie-td-img/zombie_img.png.png";

class Enemy {
    constructor({ position = {x: 0, y: 0} }){
        this.position = position;
        this.width = 75; // setting the width to 72px
        this.height = 65; // setting the height to 72px
        this.waypointsIndex = 0; // setting the index to start a 0
        this.health = 100;
        this.maxHealth = this.health;
        this.image = enemyImg
    }
    draw() {
        // the two lines bellow are going to draw my enemy 
        ctx.fillStyle = "red";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        
        // i have to set the bar element to draw on my enemy
        const healthBarWidth = this.width; // sets the width of the health bar to the width of enemy
        const healthBarHeight = 15; // sets the height of health bar to 10 px
        const healthBarX = this.position.x; // sets the position of the x value
        const healthBarY = this.position.y - healthBarHeight - cellGap// h
        
        const currentHealthWidth = (this.health / this.maxHealth) * healthBarWidth;
        
        ctx.fillStyle = "green";
        ctx.fillRect(healthBarX, healthBarY, currentHealthWidth, healthBarHeight);
        
    }
    update() {
        this.draw();
        // set the path for the enemies to go on
        const waypoints = pathWayPoints[this.waypointsIndex]; // creating a variable and setting the waypoints to the index to create a navigation
        // need to calculate the distance between point A and point B 
        const yDistance = waypoints.y - this.position.y;
        const xDistance = waypoints.x - this.position.x;
        // calculate the angel to put into sin() and cos() to get the velocity
        const angle = Math.atan2(yDistance, xDistance);
        // setting so it moves across the x and y axis 
        this.position.x += Math.cos(angle); // x - velocity
        this.position.y += Math.sin(angle); // y - velocity
        // check if once the position x and y gets to the destination, move on to the other destination, only do this for the length of the waypoints 
        if (this.position.x === waypoints.x && 
            this.position.y === waypoints.y &&
            this.waypointsIndex < pathWayPoints.length - 1 ) {
                this.waypointsIndex++
        }
    }
};
    

// Create an empty array where i can push my enemies in my for loop
// const enemyOne = new Enemy(path[0], 100) -- the loop helps me eliminate calling each enemy one by one
// creating a for loop to push enemies out and adding an xoffset to it so the enemies are not coming out the same time 

const enemies = [];
for (let i = 1 ;i < 11; i++) {
    let xOffset = i * 150;
    enemies.push( new Enemy( {
        position: {x: pathWayPoints[0].x - xOffset, y: pathWayPoints[0].y}
    })
    )
};
    
// an animation function that is animating the cells 
    
const animate = () => {
    ctx.drawImage(image, 0, 0);
    controlGrid()
    // loops through a the enemies with a for each method creating an enemy 
    enemies.forEach( (enemy) => {
        enemy.update();
    });
    requestAnimationFrame(animate);
};
animate()
    
// placeCharacter() {
//    const enemyContainer =  document.createElement("div");
//     enemyContainer.classList.add("enemy"); // use path[0] to get index then use function to get pixels, then set style to those pixels to place in the right spot "function name - returnPixels" 
//     canvasContainer.appendChild(enemyContainer)
// }; 