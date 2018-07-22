/**
    Boss
**/

const BOSS_HIT = 50;
const BOSS_BULLETS = 3;
const BOSS_IMAGE = loadImage("image/boss.png");

function Boss() {
	this.shown = false;
    this.x = random(160);
	this.y = -250;	
	this.bullets = [];

	var hit = BOSS_HIT;
	var bullets = this.bullets;
	var speedX = (random(2) == 0) ? 2 : -2;
	var speedY = 1;

	for (i = 0; i < BOSS_BULLETS; i++)
		bullets[i] = new Bullet();

	// Move boss
	
	this.move = function() {
		if (this.y < -160)
			this.y += speedY;
		else {
			drawImage(BOSS_IMAGE, this.x, this.y);
			this.y += speedY;
					
			if (this.y < 0)
				speedY = 2;
			else {
				this.x += speedX;
				
				if (this.x < 0 || this.x > 160) {
					speedX = -speedX;
					this.x += speedX;
				}
				
				if (this.y > 55 && game != WIN)
					speedY = -2;
			}
		}
	}
	
	// Explode boss
	
	this.explode = function() {
		hit--;
		setColor(BLUE);
		paintCircle(this.x + 80, this.y + 80, 100);
		
		if (hit < 0) {
			showWinGame();
			play(SOUND_WIN);
		}
	}
	
	// Fire bullet

	this.fireBullet = function() {
		for (i = 0; i < BOSS_BULLETS; i++) {
			var bullet = bullets[i];
			
			if (!bullet.shown && random(20) == 0) {
				var bx;
				
				if (this.x < ship.x - 160)
					bx = random(5) + 2;
				else if (this.x > ship.x + 40)
					bx = -random(5) - 2;
				else
					bx = random(5) - 2;
				
				bullet.show(this.x + 80, this.y + 160, bx, 6);
			}
		}
	}
	
	// Move bullet
	
	this.moveBullet = function() {
		for (i = 0; i < BOSS_BULLETS; i++) {
			var bullet = bullets[i];
			
			if (bullet.shown) {
				setRadialGradient(bullet.x, bullet.y, 3, 10, LBLUE, BLUE);
				paintCircle(bullet.x, bullet.y, 10);
				bullet.move();
			}
		}
	}
	
	// Collide bullet
	
	this.collideBullet = function(j) {
		var bullet = ship.bullets[j];		
		return (bullet.shown && bullet.x > this.x && bullet.x < this.x + 160 && bullet.y > this.y && bullet.y < this.y + 160);
	}
}