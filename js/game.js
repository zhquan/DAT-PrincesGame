// Original game from:
// http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
// Slight modifications by Gregorio Robles <grex@gsyc.urjc.es>
// to meet the criteria of a canvas class for DAT @ Univ. Rey Juan Carlos

// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/hero.png";

// princess image
var princessReady = false;
var princessImage = new Image();
princessImage.onload = function () {
	princessReady = true;
};
princessImage.src = "images/princess.png";

// monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src ="images/monster.png";

// stone image
var stoneReady = false;
var stoneImage = new Image();
stoneImage.onload = function () {
        stoneReady = true;
};
stoneImage.src = "images/stone.png";

// Game objects
var hero = {
	speed: 256 // movement in pixels per second
};
var stone = {};
var monster = {
        speed: 50
};
var princess = {};
var princessesCaught = 0;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a princess
var reset = function () {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;

	// Throw the princess somewhere on the screen randomly
    var px = 60 + (Math.random() * (canvas.width - 64))
    if (px > 452)
        px = 452;
	princess.x = px;
    var py = 60 + (Math.random() * (canvas.height - 64));
    if (py > 420)
        py = 420;
	princess.y = py;

        // moster
    var mx = 60 + (Math.random() * (canvas.width - 64))
    if (mx > 452)
        mx = 452;
	monster.x = mx;
    var my = 60 + (Math.random() * (canvas.height - 64));
    if (my > 420)
        my = 420;
	monster.y = my;

        // stone
    var sx = 60 + (Math.random() * (canvas.width - 64))
    if (sx > 452)
        sx = 452;
    stone.x = sx;
    var sy = 60 + (Math.random() * (canvas.height - 64));
    if (sy > 420)
        sy = 420;
	stone.y = sy;
};

// Update game objects
var update = function (modifier) {
    // monster move
    if (hero.x > monster.x) {// left
        if ((monster.x > (stone.x-30) && monster.x < (stone.x+20) && monster.y < (stone.y+20) && monster.y > (stone.y-20)) || monster.x < 20)
            monster.x -= 0;
        else
            monster.x += monster.speed * modifier;
    }
    if (hero.x < monster.x) {// right
        if ((monster.x < (stone.x+30) && monster.x > (stone.x-20) && monster.y < (stone.y+20) && monster.y > (stone.y-20)) || monster.x > (canvas.width-40))
            monster.x -= 0;
        else
            monster.x -= monster.speed * modifier;
    }
    if (hero.y > monster.y) {// down
        if ((monster.y > (stone.y-30) && monster.y < (stone.y+20) && monster.x < (stone.x+20) && monster.x > (stone.x-20)) || monster.y > (canvas.height-50))
            monster.y -= 0;
        else
            monster.y += monster.speed * modifier;
    }
    if (hero.y < monster.y) {// up
        if ((monster.y < (stone.y+30) && monster.y > (stone.y-20) && monster.x < (stone.x+20) && monster.x > (stone.x-20)) || monster.y < 20)
            monster.y -= 0;
        else
            monster.y -= monster.speed * modifier;
    }
    // hero move
	if (38 in keysDown) { // Player holding up
        if ((hero.y < (stone.y+30) && hero.y > (stone.y-20) && hero.x < (stone.x+20) && hero.x > (stone.x-20)) || hero.y < 30)
            hero.y -= 0;
        else
    		hero.y -= hero.speed * modifier;
	}
	if (40 in keysDown) { // Player holding down
        if ((hero.y > (stone.y-30) && hero.y < (stone.y+20) && hero.x < (stone.x+20) && hero.x > (stone.x-20))  || hero.y > (canvas.height-60))
            hero.y += 0;
        else
    		hero.y += hero.speed * modifier;
	}
	if (37 in keysDown) { // Player holding left
        if ((hero.x < (stone.x+30) && hero.x > (stone.x-20) && hero.y < (stone.y+20) && hero.y > (stone.y-20)) || hero.x < 30)
            hero.x -= 0;
        else
    		hero.x -= hero.speed * modifier;
	}
	if (39 in keysDown) { // Player holding right
        if ((hero.x > (stone.x-30) && hero.x < (stone.x+20) && hero.y < (stone.y+20) && hero.y > (stone.y-20)) || hero.x > (canvas.width-60))
            hero.x -= 0;
        else
    		hero.x += hero.speed * modifier;
	}

	// Are they touching?
	if (
		hero.x <= (princess.x + 16)
		&& princess.x <= (hero.x + 16)
		&& hero.y <= (princess.y + 16)
		&& princess.y <= (hero.y + 32)
	) {
		++princessesCaught;
		reset();
	}
    if (
        hero.x <= (monster.x + 16)
	    && monster.x <= (hero.x + 16)
	    && hero.y <= (monster.y + 16)
	    && monster.y <= (hero.y + 32)
    ){
        princessesCaught = 0;
        reset();
    }               
};

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (princessReady) {
		ctx.drawImage(princessImage, princess.x, princess.y);
	}

    if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}

    if (stoneReady) {
		ctx.drawImage(stoneImage, stone.x, stone.y);
	}

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Princesses caught: " + princessesCaught, 32, 32);
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;
};

// Let's play this game!
reset();
var then = Date.now();
//The setInterval() method will wait a specified number of milliseconds, and then execute a specified function, and it will continue to execute the function, once at every given time-interval.
//Syntax: setInterval("javascript function",milliseconds);
setInterval(main, 1); // Execute as fast as possible
