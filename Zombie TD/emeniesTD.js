// my enemy class

// Enemy Class
class Enemy {
    constructor({ position = {x: 0, y: 0} }){
        this.position = position;
        this.width = 75; // setting the width to 72px
        this.height = 75; // setting the height to 72px
        this.waypointsIndex = 0; // setting the index to start a 0

    }
    draw() {
        ctx.fillStyle = "red";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.width);
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