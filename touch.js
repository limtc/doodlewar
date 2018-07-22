/**
    Touch Event
**/

// Register events

function registerEvents() {
	onEvent("touchstart", onTouchStart);
	onEvent("touchmove", onTouchMove);
	onEvent("touchend", onTouchEnd);
}

// Handle touch events

function onTouchStart(event) {
	event.preventDefault();
	
	if (game == PLAY)
		fire = true;
	else if (game == TITLE)
		showGame();
	else
		showGameTitle();
}

function onTouchMove(event) {
	event.preventDefault();
	
	if (game == PLAY) {
		if (ship.timer == 0)
			ship.fireBullet();

		var touches = event.touches;
		var x = touches[0].pageX;
		var y = touches[0].pageY;
		var sx = ship.x;
		var sy = ship.y;
		
		if (x >= 20) {
			x -= 20;
			
			if (sx <= x - 20 && sx <= 260)
				ship.x = sx + 20;
			else if (sx >= x + 20)
				ship.x = sx - 20;
			else if (sx <= x - 10 && sx <= 260)
				ship.x = sx + 10;
			else if (sx >= x + 10)
				ship.x = sx - 10;
		}
		
		if (y >= 80) {
			y -= 80;
			
			if (sy < y - 20)
				ship.y = sy + 20;
			else if (sy > y + 20)
				ship.y = sy - 20;
			else if (sy < y - 10)
				ship.y = sy + 10;
			else if (sy > y + 10)
				ship.y = sy - 10;
		}
	}
}

function onTouchEnd(event) {
	event.preventDefault();
	fire = false;
}