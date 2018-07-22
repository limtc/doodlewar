/**
	Spaceship
**/

const SHIP_BULLETS = 4;
const SHIP_IMAGE = loadImage("image/ship.png");
const EXPLODE_COLOR = RGBColor(255, 255, 255, 127);

function Ship(x, y) {
    this.x = x;
    this.y = y;
	this.alive = true;
	this.shield = 0;
	this.health = 10;
	this.bullets = [];
	
	var bullets = this.bullets;
	
	for (i = 0; i < SHIP_BULLETS; i++)
		bullets[i] = new Bullet();
	
	// Draw ship
	
	this.draw = function() {
		drawImage(SHIP_IMAGE, this.x, this.y);
	}

	// Fire
	
	this.fire = function() {
		for (i = 0; i < SHIP_BULLETS; i++) {
			var bullet = bullets[i];
			
			if (!bullet.shown) {
				bullet.show(this.x + 20, this.y - 20, 0, -20);
				timer = TIMER;
				return;
			}
		}	
	}
	
	// Move bullet
	
	this.moveBullet = function() {
		for (i = 0; i < SHIP_BULLETS; i++) {
			var bullet = bullets[i];
			
			if (bullet.shown) {
				setPenColor(WHITE);
				line(bullet.x, bullet.y, bullet.x, bullet.y + 20); 
				bullet.move();
			}	
		}
	}
	
	// Collision detection
	
   this.collideAlien = function(alien) {
	   var ax = alien.x;
	   var ay = alien.y;
	   
	   if (ax > this.x - 40 && ax + 40 < this.x + 80 && ay > this.y - 40 && ay + 40 < this.y + 80) {
		   alien.explode();
		   alien.reset();
		   ship.damage(2);
		   return true;
	   }
	   else
		   return false;
    }
	
	this.collideBoss = function() {
		var bx = boss.x;
		var by = boss.y;
		
		if (bx > this.x - 160 && bx < this.x + 160 && by > this.y - 160 && by < this.y + 160) {
			boss.explode();
			ship.damage(2);
			return true;
		}
		else
			return false;
    }
    
    this.collideBullet = function(alien) {
		var bullet = alien.bullet;
		
		if (bullet.shown) {
			if (bullet.x + 5 > this.x && bullet.x - 5 < this.x + 40 && bullet.y + 5 > this.y && bullet.y - 5 < this.y + 40) {
				bullet.hide();
				ship.damage(1);
				return true;
			}			
		}

    	return false;
    }
	
	this.collideBossBullet = function() {
		var bullets = boss.bullets;
		
		for (i = 0; i < BOSS_BULLETS; i++) {
			var bullet = bullets[i];
			
			if (bullet.shown) {
				if (bullet.x + 10 > this.x && bullet.x - 10 < this.x + 40 && bullet.y + 10 > this.y && bullet.y - 10 < this.y + 40) {
					bullet.hide();
					ship.damage(1);
					return true;
				}
			}
		}
		
    	return false;
    }
	
	// Damage ship
	
	this.damage = function(dmg) {
		if (this.shield > 0) {
			this.shield -= dmg;
			if (this.shield < 0)
				this.shield = 0;
		}
		else
			this.health -= dmg;
		
		setColor(EXPLODE_COLOR);
		paintCircle(this.x + 20, this.y + 20, 30);
		setHealthBar();
		
		if (this.health <= 0) {
			this.alive = false;
			paintCircle(this.x + 20, this.y + 20, 60);
			play(SOUND_OVER);
		}
	}
}