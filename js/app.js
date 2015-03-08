//This function will be called at every time-step. And will check if player will collide with enemies.
var Collision = function(enemy, player){
    //If player is in the same "box" as an enemy, he will be reset.
    var box = 0;

    //Check if player is in same row as enemy. 
    if(enemy.y == player.y){
        //These will check if player is the same "box" as an enemy. 
        if(parseInt(enemy.x) < 150){
            box = 0;
            console.log(box);
        };
        if(parseInt(enemy.x) < 250 && parseInt(enemy.x) > 100){
            box = 100;
            console.log(box);
        };
        if(parseInt(enemy.x) < 350 && parseInt(enemy.x) > 200){
            box = 200;
            console.log(box);
        };
        if(parseInt(enemy.x) < 450 && parseInt(enemy.x) > 300){
            box = 300;
            console.log(box);
        };
        if(parseInt(enemy.x) < 550 && parseInt(enemy.x) > 400){
            box = 400;
            console.log(box);
        };

        //If player is in the same box as an enemy, he will be reset. 
        if(player.x == box){
            player.reset();
        };
    };
};

// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    //Set initial enemy position
    this.x = x;
    this.y = y;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //The bugs will move ar random speeds, ranging from 1 to 200.
    this.x += dt*Math.floor((Math.random() * 200) + 1);

    //When bugs exit the screen, reset their position.
    if(this.x > 500){
        this.x = null; 
    };

    //This portion will check collisions in each timestep.
    Collision(e1, player);
    Collision(e2, player);
    Collision(e3, player);
    Collision(e4, player);
    Collision(e5, player);
    Collision(e6, player);

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x,y){
    //Set initial starting point
    this.x = x;
    this.y = y;

    //Load player sprite
    this.sprite = 'images/char-boy.png';
};

//Will delegate to Enemy.prototype for failed property lookups.
//Player.prototype = Object.create(Enemy.prototype);

//This checks if player hits water. If player hits water, reset player, as he has won. 
Player.prototype.update = function(dt){
    if(this.y == -25){
        this.reset();
    };
};

//This will reset player back to inital position.
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 425;
};

//Render player sprite. 
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Handle keyboard inputs
Player.prototype.handleInput = function(state){
    //When you press down, your player will move down 75 pixels. 
    if(state == 'down'){
        if((this.y+75) < 500){
            this.y += 75;
        };
    };
    //When you press up, your player will move up 75 pixels. 
    if(state == 'up'){
        if((this.y-75) >= -25){
            this.y -= 75;
        };
    };
    //When you press left, your player will move left 100 pixels. 
    if(state == 'left'){
        if((this.x-100) >= 0){
            this.x -= 100;
        };
    };
    //When you press right, your player will move right 100 pixels. 
    if(state == 'right'){
        if((this.x+100) <= 400){
            this.x += 100;
        };
    };  
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player


//Creates 6 enemy instances. 
var e1 = new Enemy(0,50);
var e2 = new Enemy(0,125);
var e3 = new Enemy(0,200);
var e4 = new Enemy(0,50);
var e5 = new Enemy(0,125);
var e6 = new Enemy(0,200);

//Places enemies in an array. 
var allEnemies = [e1,e2,e3,e4,e5,e6]; 

//Creates a player instance. 
var player = new Player(200,425); 

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
