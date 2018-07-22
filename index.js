/**
    Doodle War - by Lim Thye Chean
**/

const WIDTH = 320;
const HEIGHT = 480;

const TITLE = 0;
const PLAY = 1;
const OVER = 2;
const WIN = 3;

const STARS = 12;
const STAR_HEIGHT = 350;

const TIMER = 5;
const SHIELD_COLOR = RGBColor(0, 127, 255);
const TITLE_IMAGE = loadImage("image/title.jpg");
const MUSIC = getSound("smallWorld.mp3");
const SOUND_READY = getSound("soundReady.wav");
const SOUND_OVER = getSound("soundOver.wav");
const SOUND_WIN = getSound("soundWin.wav");

var timer = 0;
var score = 0;
var hiscore = 0;
var game;
var ship;
var boss;
var healthX;
var fire = false;
var aliens = [];
var starX = [];
var starY = [];
var starColors = [];

// Setup

graphics();
setPenSize(2);

for (i = 0; i < STARS; i++) {
	starX[i] = random(WIDTH);
	starY[i] = random(STAR_HEIGHT);
	starColors[i] = GSColor(15 - i);
}

// Start Game

showGameTitle();
registerEvents();
setInterval(main, 40);

// Show Game Title

function showGameTitle() {
	game = TITLE;
	
	hideElement("win");
	hideElement("over");
	showElement("message");
	showElement("credits");
}

// Show Game

function showGame() {
	game = PLAY;
	ship = new Ship(140, 380);
	boss = new Boss();
	fire = false;
	timer = 0;
	score = 0;
	alienCount = 0;
	
	for (i = 0; i < ALIENS; i++)
		aliens[i] = new Alien();
	
	setHealthBar();
	hideElement("message");
	hideElement("credits");
	hideElement("hiscore");
	setElement("score", score);
}

// Show Win Game

function showWinGame() {
	game = WIN;
	showElement("hiscore");
	showElement("win");
}

// Show Game Over

function showGameOver() {
	game = OVER;
	showElement("hiscore");
	showElement("over");
}

// Main loop

function main() {	
	clearScreen();

	switch (game) {
		case PLAY:
			drawGame();
			break;
		
		case TITLE:
			drawGameTitle();
			break;
		
		case WIN:
			drawWinGame();
			break;
			
		case OVER:
			drawGameOver();
			break;
	}
}

// Draw Game

function drawGame() {

	// Draw background

	drawStars();
	setColor(SHIELD_COLOR);
	paintRect(10, 10, healthX, 16);

	// Draw aliens
	
	for (i = 0; i < ALIENS; i++) {
		var alien = aliens[i];

        alien.move();
		alien.fireBullet();
		alien.moveBullet();
		
		for (b = 0; b < SHIP_BULLETS; b++) {
			if (alien.collideBullet(b)) {
				score += alien.getScore();
				setElement("score", score);
				
				alien.explode();
				ship.bullets[b].hide();
			}	
		}
		
		if (ship.collideBullet(alien) || ship.collideAlien(alien)) {
			if (ship.health <= 0)
				showGameOver();
		}
	}
	
	// Draw boss
	
	if (boss.shown) {
		boss.move();
		boss.fireBullet();
		boss.moveBullet();

		for (b = 0; b < SHIP_BULLETS; b++) {
			if (boss.collideBullet(b)) {
				score += 50;
				setElement("score", score);
				
				boss.explode();
				ship.bullets[b].hide();
			}	
		}

		if (ship.collideBossBullet() || ship.collideBoss()) {
			if (ship.health <= 0)
				showGameOver();
		}
	}
		
	// Draw ship
	
	ship.draw();
	ship.moveBullet();
	
	if (timer > 0)
		timer--;
	else if (fire)
		ship.fire();
}

// Draw Game title

function drawGameTitle() {
	drawImage(TITLE_IMAGE, 0, 0);
	drawStars();
}

// Draw Win Game

function drawWinGame() {
	if (score > hiscore) {
		hiscore = score;
		setElement("hiscore", "Hi Score: " + hiscore);
	}
	
	drawStars();

	for (i = 0; i < ALIENS; i++) {
		var alien = aliens[i];
		
        alien.move();
		alien.moveBullet();
	}
	
	if (ship.y > -40) {
		ship.y -= 10;
		ship.draw();
	}

	ship.moveBullet();
}

// Draw Game Over

function drawGameOver() {
	if (score > hiscore) {
		hiscore = score;
		setElement("hiscore", "Hi Score: " + hiscore);
	}
	
	drawStars();
	
	for (i = 0; i < ALIENS; i++) {
		var alien = aliens[i];
		
        alien.move();
		alien.moveBullet();
	}
	
	ship.moveBullet();
}

// Draw Stars

function drawStars() {
	for (i = 0; i < STARS; i++) {
		if (random(20) > 0) {
			setColor(starColors[i]);
			paintRect(starX[i], starY[i], 3, 3);		
			starY[i] += i % 5 + 1;
			
			if (starY[i] > STAR_HEIGHT) {
				starX[i] = random(WIDTH);
				starY[i] = 0;
			}
		}
	}	
}

// Set high score

function setHiscore(score) {
	if (score > 0) {
		hiscore = score;
		setElement("hiscore", "Hi Score: " + hiscore);
	}
}

// Set health bar

function setHealthBar() {
	healthX = 10 + 10 * ship.health;
}

function getSound(sound) {
	return new Audio("sound/" + sound);
}

function play(sound) {
	if (sound != null)
		sound.play();
}

function stop(sound) {
	if (sound != null) {
		sound.pause();
		sound.currentTime = 0;
	}
}