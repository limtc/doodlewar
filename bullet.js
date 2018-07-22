/**
	Bullet
**/

function Bullet() {
	this.x = -1;
	this.y = -1;
	this.shown = false;
	this.color = 0;
	
	var deltaX = 0;
	var deltaY = 0;
	
	// Show bullet
	
	this.show = function(x, y, dx, dy) {
		this.shown = true;
		this.x = x;
		this.y = y;
		
		deltaX = dx;
		deltaY = dy;
	}
	
	this.hide = function() {
		this.shown = false;
	}
  
	// Move bullet
	
	this.move = function() {
		this.x += deltaX;
		this.y += deltaY;
		
		if (this.y < 0 || this.y > 480)
			this.shown = false;
	}
}