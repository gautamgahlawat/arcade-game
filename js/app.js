var platformBounds = {
        left: 0,
        right: 404,
        up: -23,
        down: 390
    },
    keyIsDown = {
        37: false,
        38: false,
        39: false,
        40: false
    };

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.width = 90;
    this.height = 70;
    this.speed = 500;

    this.sprite = 'images/enemy-bug.png';

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + Math.random() * this.speed * dt;
    if (this.x > 490) {
        this.x = 0;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
    this.x = 200;
    this.y = 390;
    this.width = 75;
    this.height = 85;
    this.speed = 50;

    this.sprite = 'images/char-boy.png';
}

//function to move player back to its initial position
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
    //ctx.clearRect(10,30,300,150);
}

// Draws the player on the screen, as required
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//update the player's position
Player.prototype.update = function(dt) {
    if (this.y === -23) {
        collisionWithWater = true;
        collisionCoordinates.push({x: this.x+12, y: this.y+120});
        this.x = 202;
        this.y = 392;
    }
};


Player.prototype.handleInput = function(direction) {
    // switch (key) {
    //     case 'left':
    //         if (this.x > platformBounds.left && keyIsDown['37'] === false && gameHasStarted) {
    //             this.x -= 101;
    //             keyIsDown['37'] = true;
    //         }
    //         break;
    //     case 'up':
    //         if (this.y > platformBounds.up && keyIsDown['38'] === false && gameHasStarted) {
    //             this.y -= 83;
    //             keyIsDown['38'] = true;
    //         }
    //         break;
    //     case 'right':
    //         if (this.x < platformBounds.right && keyIsDown['39'] === false && gameHasStarted) {
    //             this.x += 101;
    //             keyIsDown['39'] = true;
    //         }
    //         break;
    //     case 'down':
    //         if (this.y < platformBounds.down && keyIsDown['40'] === false && gameHasStarted) {
    //             this.y += 83;
    //             keyIsDown['40'] = true;
    //         }
    //         break;
    //     default:
    // }


    // if (direction === 'left' && this.x > 0) {
    //     this.x -= 100;
    // }
    // if (direction === 'up' && this.y > 0) {
    //     this.y -= 80;



    // }

    // if (direction === 'right' && this.x < 400) {
    //     this.x += 100;
    // }



    // if (direction === 'down' && this.y < 400) {
    //     this.y += 100;

    // }

if (direction === 'up') {
    if (this.y ===  0) {
        this.y = 0;
        //console.log('You Won!');
        //var c=document.getElementById('myCanvas');
        var ctx=document.getElementById('myCanvas').getContext('2d');
        ctx.font='40px Georgia';
        var gradient=ctx.createLinearGradient(0,0,document.getElementById('myCanvas').width,0);
        gradient.addColorStop("0","magenta");
        gradient.addColorStop("0.5","blue");
        gradient.addColorStop("1.0","red");
        // Fill with gradient
        ctx.fillStyle=gradient;
        // ctx.drawImage(Resources.get(this.win), 10, 10);
        // ctx.drawImage(Resources.get(this.sprite), 80, 10);
        // ctx.drawImage(Resources.get(this.win), 150, 10);
        ctx.fillText("You Won! :) ",40,30);
        player.reset();
    }

        else {
        this.y -= 80;
    }
}


    if (direction === 'down') {
        if (this.y === 400) {
            this.y = 400;
        }
        else {
        this.y += 80;
        }
    }

    if (direction === 'right') {

        if (this.x === 400 && (this.y === 400 || this.y === 320 || this.y === 240 || this.y === 160 ||this.y === 80  || this.y === 0 )) {
            this.x= 400;
        }
        else {
            this.x += 100 ;
        }
    }

    if (direction === 'left') {
        if (this.x === 0 && (this.y === 400 || this.y === 320 || this.y === 240 || this.y === 160 || this.y === 80 || this.y === 0 )){
            this.x = 0;
        }
        else {
        this.x -= 100;
        }
    }


};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new Enemy(0,50);
var enemy2 = new Enemy(0,130);
var enemy3 = new Enemy(0,210);
var enemy4 = new Enemy(0,210);

var allEnemies = [enemy1, enemy2, enemy3, enemy4];
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


// document.addEventListener('keyup', function(e) {
//     keyIsDown[e.keyCode] = false;
// });