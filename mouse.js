/**
    Mouse Event
**/

// Register events

function registerEvents() {
	onEvent("mousedown", onMouseDown);
	onEvent("mousemove", onMouseMove);
	onEvent("mouseup", onMouseUp);
}

// Handle mouse events

function onMouseDown(event) {
	event.preventDefault();
	
	if (game == PLAY)
		fire = true;
	else if (game == TITLE) {
		showGame();
		play(MUSIC);
	}
	else {
		showGameTitle();
		stop(MUSIC);
	}
}

function onMouseMove(event) {
	event.preventDefault();
	
	if (game == PLAY) {
		var touches = event.touches;
		var x = event.clientX;
		var y = event.clientY;
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
		
		if (y >= 40) {
			y -= 40;
			
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

function onMouseUp(event) {
	event.preventDefault();
	fire = false;
}