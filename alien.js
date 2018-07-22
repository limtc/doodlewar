/**
    Alien
**/

const ALIENS = 5;
const ALIEN_MAX = 11;
const ALIEN_WAVE = 14;
const ALIEN_COLORS = [GREEN, PURPLE, RED, FLESH, LBLUE, PBLUE, BLUE, ORANGE, YELLOW, LILAC];

var alienCount = 0;
var alienImages = [];
var aliens = [];

for (i = 0; i < ALIEN_MAX; i++)
	alienImages[i] = loadImage("image/alien" + i + ".png");

function Alien() {
    this.x = random(280);
	this.y = -100 - random(50);
	this.bullet = new Bullet();

	var type = 0;
	var bullet = this.bullet;
	var dirX = 0;
	var speedX = 0;
	var speedY = random(3) + 2;
	
	// Move alien
	
	this.move = function() {		
		if (this.y < -40)
			this.y += speedY;
		else {
			drawImage(alienImages[type], this.x, this.y);

			switch (type) {
				case 0:
					this.y += speedY + 1;						
					break;
					
				case 1:
					this.x += dirX;
					this.y += speedY + 1;
					
					if (this.x < -40)
						this.x = WIDTH;
					else if (this.x > WIDTH)
						this.x = -40;
					
					break;
					
				case 2:
					this.x += dirX;
					this.y += speedY + 2;
					
					if (this.x < -40)
						this.x = WIDTH;
					else if (this.x > WIDTH)
						this.x = -40;
					
					break;
					
				case 3:
					this.x += speedX * dirX;
					this.y += speedY + 2;
					
					if (this.x < -40)
						this.x = WIDTH;
					else if (this.x > WIDTH)
						this.x = -40;
					
					break;					
					
				case 4:
					this.x += speedX * dirX;
					this.y += speedY + 2;
					
					if (this.x < -40) {
						this.x = WIDTH;
						this.y = random(100);
					}
					else if (this.x > WIDTH) {
						this.x = -40;
						this.y = random(100);
					}
					
					break;
					
				case 5:
					this.x += (speedX + 2) * dirX;
					
					if (this.x < -40 || this.x > WIDTH) {
						dirX = -dirX;
						this.x += (speedX + 2) * dirX;
						this.y = random(100);
					}
					else {
						if (this.y > 0)
							this.y += 2;
						else
							this.y += speedY + 2;
					}					
					
					break;
					
				case 6:
					this.x += (speedX + 2) * dirX;
					
					if (this.y < 20 || this.x < 40 || this.x > 240) {
						this.y += speedY + 2;
						
						if (this.x < 0 || this.x > 280)
							dirX = -dirX;
					}
					
					break;
					
				case 7:
					if (this.y < 80)
						this.y += speedY + 2;
					else {
						this.x += (speedX + 2) * dirX;
						this.y += speedY;
						
						if (this.x < -40)
							this.x = WIDTH;
						else if (this.x > WIDTH)
							this.x = -40;
					}
					
					break;
					
				case 8:
					if (this.y < 100) {
						this.x += (speedX + 2) * dirX;
						this.y += speedY;
						
						if (this.x < 0 || this.x > 280) {
							dirX = -dirX;
							this.x += (speedX + 2) * dirX;
						}
					}
					else
						this.y += speedY + 2;
					
					break;	
					
				case 9:
					if (this.y < 120 || this.x < 40 || this.x > 240) {
						this.x += (speedX + 2) * dirX;
						this.y += speedY;

						if (this.x < -40)
							this.x = WIDTH;
						else if (this.x > WIDTH)
							this.x = -40;
					}
					else
						this.y += speedY + 2;
					
					break;	
					
				case 10:
					this.x += (speedX + 2) * dirX;
					this.y += speedY + 2;
					
					if (this.x < 0 || this.x > 280) {
						dirX = -dirX;
						this.x += (speedX + 2) * dirX;
					}
					else if (this.x < 40 || this.x > 240)
						this.x -= 2 * dirX;
					else
						this.y -= 2;
					
					break;
			}
			
			if (this.y > HEIGHT) 
				this.reset();
		}
	}
	
	// Explode alien
	
	this.explode = function() {
		setColor(YELLOW);
		paintCircle(this.x + 20, this.y + 20, 30);		
		this.reset();
	}
	
	// Reset alien
	
	this.reset = function() {
		this.x = random(280);
		this.y = -50 - random(50);
		
		alienCount++;
		speedX = random(3) + 2;
		speedY = random(3) + 2;
		dirX = (this.x < 160) ? 1 : -1;
		
		if (boss.shown)
			speedY = 0;
		else if (alienCount > (type + 1) * ALIEN_WAVE - 5) {
			type++;
			this.y -= 80;
			
			if (type == ALIEN_MAX) {
				boss.shown = true;
				speedY = 0;
			}
		}
	}
	
	// Fire bullet
	
	this.fireBullet = function() {
		if (type > 0 && !bullet.shown && this.y > 0 && this.x > 0 && this.x < 280 && random(200 - type * 9) == 0) {
			var bx = 0;
			
			if (this.x < ship.x - 40)
				bx = 1;
			else if (this.x > ship.x + 40)
				bx = -1;
			
			bullet.show(this.x + 20, this.y + 40, bx, 7);
			bullet.color = ALIEN_COLORS[type - 1];
		}
	}
	
	// Move bullet
	
	this.moveBullet = function() {
		if (bullet.shown) {
			setColor(bullet.color);
			paintCircle(bullet.x, bullet.y, 6);
			bullet.move();
		}
	}
	
	// Collide bullet
	
	this.collideBullet = function(j) {
		var bullet = ship.bullets[j];
		return (bullet.shown && bullet.x > this.x && bullet.x < this.x + 40 && bullet.y > this.y && bullet.y < this.y + 40);
	}
	
	// Get score
	
	this.getScore = function() {
		return 10 + type * 5;
	}
}