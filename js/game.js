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
	speed: 200 // movement in pixels per second
};
var stones = [];
var n_stone = 1;
var monsters = [];
var n_monster = 1;
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
    var py = 60 + (Math.random() * (canvas.height - 64));
    while ((px == hero.x) && (py == hero.y)){
        px = 60 + (Math.random() * (canvas.width - 64))
        py = 60 + (Math.random() * (canvas.height - 64));
    }
    if (px > 452)
        px = 452;
	princess.x = px;
    if (py > 420)
        py = 420;
	princess.y = py;

        // moster
    monsters = [];
    for(i=0;i<n_monster;i++){
        var monster = {};
        var mx = 60 + (Math.random() * (canvas.width - 64));
        var my = 60 + (Math.random() * (canvas.height - 64));
        while (((mx == hero.x) && (my == hero.y)) || ((px == mx)&&(py == my))){
            mx = 60 + (Math.random() * (canvas.width - 64));
            my = 60 + (Math.random() * (canvas.height - 64));
        }
        if (mx > 452)
            mx = 452;
	    monster.x = mx;
        
        if (my > 420)
            my = 420;
	    monster.y = my;
        monster.speed = 5;
        monsters.push(monster);
    }

        // stone
    stones = [];
    for(i=0;i<n_stone;i++){
        var stone = {};
        var sx = 60 + (Math.random() * (canvas.width - 64));
        var sy = 60 + (Math.random() * (canvas.height - 64));
        while (((hero.x == sx)&&(hero.y == sy))||((sx == py)&&(sy == py))){
            sx = 60 + (Math.random() * (canvas.width - 64));
            sy = 60 + (Math.random() * (canvas.height - 64));
        }
        if (sx > 452)
            sx = 452;
        stone.x = sx;
        
        if (sy > 420)
            sy = 420;
	    stone.y = sy;
        stones.push(stone);
    }
};
// Update game objects
var update = function (modifier) {
    // monster move
    for (i=0;i<monsters.length;i++){
        if (hero.x > monsters[i].x) {// left
            if (monsters[i].x < 30){
                monsters[i].x += 0;
            }
            else
                monsters[i].x += monsters[i].speed * modifier;
        }
        if (hero.x < monsters[i].x) {// right
            if (monsters[i].x > (canvas.width-60)){
                monsters[i].x -= 0;
            }
            else
                monsters[i].x -= monsters[i].speed * modifier;
        }
        if (hero.y > monsters[i].y) {// down
            if (monsters[i].y > (canvas.height-60)){
                monsters[i].y += 0;
            }
            else
                monsters[i].y += monsters[i].speed * modifier;
        }
        if (hero.y < monsters[i].y) {// up
            if (monsters[i].y < 30){
                monsters[i].y -= 0;
            }
            else
                monsters[i].y -= monsters[i].speed * modifier;
        }
    }
    // hero move
	if (38 in keysDown) { // Player holding up
        if (hero.y < 30){
            hero.y -= 0;
        }else
    		hero.y -= hero.speed * modifier;
	}
	if (40 in keysDown) { // Player holding down
        if (hero.y > (canvas.height-60)){
            hero.y += 0;
        }
        else
	    	hero.y += hero.speed * modifier;
	}
	if (37 in keysDown) { // Player holding left
        if (hero.x < 30){
            hero.x -= 0;
        }
        else
		    hero.x -= hero.speed * modifier;
	}
	if (39 in keysDown) { // Player holding right
        if (hero.x > (canvas.width-60)){
            hero.x += 0;
        }
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
        if((princessesCaught % 10) == 0){
            console.log(hero.speed);
            n_stone++;
        }
        if((princessesCaught % 15) == 0){
            n_monster++;
        }
		reset();
	}
    // monster vs hero
    for(i=0; i<monsters.length; i++){
        if (
            hero.x <= (monsters[i].x + 16)
	        && monsters[i].x <= (hero.x + 16)
	        && hero.y <= (monsters[i].y + 16)
	        && monsters[i].y <= (hero.y + 32)
        ){
            monsters[i].speed = 5;
            princessesCaught = 0;
            n_monster = 1;
            n_stone = 1;
            reset();
        }
    }
    // hero vs stone
    for(i=0; i<stones.length; i++){
        if (
            hero.x <= (stones[i].x + 16)
	        && stones[i].x <= (hero.x + 16)
	        && hero.y <= (stones[i].y + 16)
	        && stones[i].y <= (hero.y + 32)
        ){
            var x = hero.x;
            var y = hero.y;
            if (38 in keysDown) { // Player holding up
                hero.y = stones[i].y+16;
            }
            if (40 in keysDown) { // Player holding down
                hero.y = stones[i].y-32;
            }
            if (37 in keysDown) { // Player holding left
                hero.x = stones[i].x+16;
            }
            if (39 in keysDown) { // Player holding right
                hero.x = stones[i].x-16;
            }
        }
    }
    // monster vs stone
    for(i=0; i<monsters.length; i++){
        for(j=0; j<stones.length; j++){
            if (
                monsters[i].x <= (stones[j].x + 16)
	            && stones[j].x <= (monsters[i].x + 16)
	            && monsters[i].y <= (stones[j].y + 16)
	            && stones[j].y <= (monsters[i].y + 32)
            ){
                if (hero.x > monsters[i].x) {// left
                        monsters[i].x = stones[j].x+16;
                }
                if (hero.x < monsters[i].x) {// right
                        monsters[i].x = stones[j].x-16;
                }
                if (hero.y > monsters[i].y) {// down
                        monsters[i].y = stones[j].y-32;
                }
                if (hero.y < monsters[i].y) {// up
                        monsters[i].y = stones[j].y+16;
                }
            }
        }
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
        for(i=0;i<monsters.length;i++){
		    ctx.drawImage(monsterImage, monsters[i].x, monsters[i].y);
        }
	}

    if (stoneReady) {
        for(i=0;i<stones.length;i++){
    		ctx.drawImage(stoneImage, stones[i].x, stones[i].y);
        }
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
