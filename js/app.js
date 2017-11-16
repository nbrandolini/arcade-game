// Enemies our player must avoid
var Enemy = function(x, y) {
    'use strict';

    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    // defines enemy image
    this.sprite = 'images/enemy-bug.png';
    // assign enemy start position
    this.x = x;
    this.y = y;
    this.width = 52;
    this.height = 50;
    // defines enemy speed to get a number between 100(inclusive) and 300(exclusive)
    this.speed = Math.floor((Math.random() * 200 + 100));
};
//sets collision with player
Enemy.prototype.checkCollisions = function() {
    if (player.x < this.x + this.width &&
        player.x + player.width > this.x &&
        player.y < this.y + this.height &&
        player.height + player.y > this.y) {
        console.log("collision!!!");
        player.x = 202;
        player.y = 404;
    }
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // if enemy moves off canvas, enemy resets to start

    this.x += this.speed * dt;
    if (this.x > 500) {
        this.x = -100;
    }
    this.checkCollisions();
};
// reset speed when game is reset

Enemy.prototype.reset = function() {
    this.speed = Math.floor(Math.random() * 200 + 100);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    // define player image
    this.sprite = 'images/char-cat-girl.png';
    this.x = 202; //centered
    this.y = 404; //botom row
    this.width = 52;
    this.height = 50;
};

Player.prototype.update = function() {
    if (this.x < 0) {
        this.x = 0;
    } else if (this.x > 620) {
        this.x = 620;
    } else if (this.y < 0) {
        this.y = 0;
    } else if (this.y > 435) {
        this.y = 435;
    }

    if (this.win() === true) {
        console.log("Winner!");
    }

};
//message to appear when player crosses to water
Player.prototype.win = function() {
    if (this.y < 10) {
        this.x = 202;
        this.y = 404;
        return true;
    }
};


Player.prototype.reset = function() {
    this.x = 202;
    this.y = 404;
    console.log('player reset function');
};

// draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// defines how player moves around the grid

Player.prototype.handleInput = function(allowedKeys) {
    switch (allowedKeys) {
        case 'left':
            this.x = this.x - 30;
            break;

        case 'right':
            this.x = this.x + 30;
            break;

        case 'up':
            this.y = this.y - 30;
            break;

        case 'down':
            this.y = this.y + 30;
            break;
    }
};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies


var enemy1 = new Enemy(0, 60, 8);
var enemy2 = new Enemy(0, 145, 4);
var enemy3 = new Enemy(0, 230, 5);
var allEnemies = [enemy1, enemy2, enemy3];

// Place the player object in a variable called player
var player = new Player();

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
