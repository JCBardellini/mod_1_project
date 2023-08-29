const canvas = document.querySelector("#canvas-board");
const ctx = canvas.getContext("2d");
canvas.width = 960;
canvas.height = 640;

// adding the background map to the canvas
const image = new Image(); // creates the img
image.src = "/Zombie-td-img/map.png";
image.onload = () => {
    ctx.drawImage(image, 0, 0);
};



// declare all global variables that we may use whenever
const cellSize = 32; // each cell in the grid
const cellGap = 2; // gap between cells
const gameGrid = []; 

// Game board - tiles and 
const controlsBar = {
    width: canvas.width,
    height: cellSize, 
};
// creating a class "cell" that will help us make the grid in the game
class Cell {
    // X-coordinate and y-coordinate
    constructor(x, y) {
        this.x = x; // 
        this.y = y;
        this.width = cellSize;  // setting the width of each cell to 32px
        this.height = cellSize; // setting the height of each cell to 32px
    }
    draw() {
        ctx.strokeStyle = "black"; // gives me the outline of the box
        ctx.strokeRect(this.x, this.y, this.width, this.height); // x position, y position and dimensions of outline
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
const controlGrid = () => {
    for (let i = 0; i < gameGrid.length; i++) {
        gameGrid[i].draw();
    };
}; 

// Projectiles
// Defenders
// enemies
// resources 
// utilities


// an animation function that is animating the cells 
const animate = () => {
    controlGrid();
    requestAnimationFrame(animate);
};
animate()