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

// global variables, that will help us guide our game

const cellSize = 32; // each cell in the grid
const cellGap = 2; // gap between cells
const gameGrid = []; 

// Game board set up

const controlsBar = {
    width: canvas.width,
    height: cellSize, 
};
// creating a class called "cell" that will make each grid cell of the canvas
// this will help us set up the obstacles in our maps too because we know what cells we need to block off
class Cell {
    // X-coordinate and y-coordinate
    constructor(x, y, isObstacle = false) {
        this.x = x; // 
        this.y = y;
        this.width = cellSize;  // setting the width of each cell to 32px
        this.height = cellSize; // setting the height of each cell to 32px
        this.isObstacle = isObstacle; // adding the obstacle cell 
    }
    // making an if/else statement for the cells to set up obstacles that we created in the map, this will guide us where we can place our defenders
    draw() {
        if (this.isObstacle) {
            ctx.fillStyle="red"; // fills the box
            ctx.fillRect(this.x, this.y, 10 /* should be = "this.width"*/, this.height); // change the width to help me see the map and index i need to be on to create obstacle 
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
    {x: -150, y: 480}, 
    {x: 203, y: 480}, 
    {x: 203, y: 256}, 
    {x: 460, y: 256}, 
    {x: 460, y: 544}, 
    {x: 780, y: 544}, 
    {x: 780, y: 128}, 
    {x: 1000, y: 128}
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


// Defenders

// enemies

class Enemy {
    constructor({ position = {x: 0, y: 0} }){
        this.position = position;
        this.width = cellSize;
        this.height = cellSize;
        this.waypointsIndex = 0;
        
    }
    draw() {
        ctx.fillStyle = "red";
        ctx.fillRect(this.position.x, this.position.y, 75, 75);
    }
    update() {
            this.draw();

            // set the path for the enemies to go on
            const waypoints = pathWayPoints[this.waypointsIndex];
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
        
        const enemy = new Enemy({position: {x:-100, y: 480}});
    // const enemyOne = new Enemy(path[0], 100)
    // enemyOne.placeCharacter();
    
    // an animation function that is animating the cells 
    const animate = () => {
        ctx.drawImage(image, 0, 0);
        controlGrid();
        requestAnimationFrame(animate);
        enemy.update();
    };
    animate()
    
    // placeCharacter() {
        //    const enemyContainer =  document.createElement("div");
        //     enemyContainer.classList.add("enemy"); // use path[0] to get index then use function to get pixels, then set style to those pixels to place in the right spot "function name - returnPixels" 
        //     canvasContainer.appendChild(enemyContainer)
        // }; 