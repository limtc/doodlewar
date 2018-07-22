/**
    GS Canvas 1.4.1 - by Lim Thye Chean

    clearScreen: clear screen
	GSColor: get color from Apple IIGS color palette (0-15)
	RGBColor: get RGB color with optional alpha (0-255)	
	randomColor: get random color
    setColor: set color for paint
	setPenColor: set color for line and frames
	setBackgroundColor: set background to a color
	setGradient: set gradient colors
    setRadialGradient: set radial gradient colors
    setPenSize: set pen size
    plot: plot dot
    line: draw line
    paintRect: paint rectangle
    paintCircle: paint circle
    paintPoly: paint polygon
    frameRect: draw rectangle outline
    frameCircle: draw circle outline
    framePoly: draw polygon outline
	clearRect: clear rectangle
    openPoly: define a polygon (use moveTo and lineTo to define points)
    loadImage: load and display image
    drawImage: draw image
    random: get random number
	randomBoolean: get random boolean
	setHTML: set HTML element content
	onEvent: set event handler
	go: go to a link
**/

var gr = null;
var canvas = null;
var penSize = 1;
var screenWidth = 320;
var screenHeight = 480;

// Apple IIGS Color palette

const BLACK = "#000000";
const DGREY = "#777777";
const BROWN = "#884411";
const PURPLE = "#7722CC";
const BLUE = "#0000FF";
const DGREEN = "#008800";
const ORANGE = "#FF7700";
const RED = "#DD0000";
const FLESH = "#FFAA99";
const YELLOW = "#FFFF00";
const GREEN = "#00EE00";
const LBLUE = "#44DDFF";
const LILAC = "#DDAAFF";
const PBLUE = "#7788FF";
const LGREY = "#CCCCCC";
const WHITE = "#FFFFFF";

const PI2 = Math.PI * 2;

// Set graphics

function graphics() {
	if (!gr) { 
	    canvas = document.getElementsByTagName("canvas")[0];
		screenWidth = canvas.getAttribute("width");
		screenHeight = canvas.getAttribute("height");
	    gr = canvas.getContext("2d");
		gr.lineCap = "round";
	}
}

// Clear screen

function clearScreen() {
	gr.clearRect(0, 0, screenWidth, screenHeight);
}

// Get random number

function random(number) {
    return Math.floor(Math.random() * number);
}

function randomBoolean() {
	return (Math.random() < 0.5) ? true : false;
}

// Get color

function GSColor(color) {
	var COLORS = [BLACK, DGREY, BROWN, PURPLE, BLUE, DGREEN, ORANGE, RED, FLESH, YELLOW, GREEN, LBLUE, LILAC, PBLUE, LGREY, WHITE];
	return COLORS[color];
}

function RGBColor(red, green, blue, alpha) {
	return "rgb(" + red + "," + green + "," + blue + (alpha == null ? "" : "," + alpha / 255) + ")";
}

function randomColor() {
	return "rgb(" + random(256) + "," + random(256) + "," + random(256) + ")";
}

// Set pen size

function setPenSize(size) {
    penSize = size;
	gr.lineWidth = penSize;
}

// Set color

function setColor(color) {
    gr.fillStyle = color;
}

function setPenColor(color) {
	gr.strokeStyle = color;
}

function setBackgroundColor(color) {
	canvas.style.backgroundColor = color;
}

// Set gradient

function setGradient(x1, y1, x2, y2, color1, color2) {
    var gradient = gr.createLinearGradient(x1, y1, x2, y2);

    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    gr.fillStyle = gradient;
}

// Set radial gradient

function setRadialGradient(x, y, r1, r2, color1, color2) {
    var gradient = gr.createRadialGradient(x, y, r1, x, y, r2);

    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    gr.fillStyle = gradient;
}

// Plot dot

function plot(x, y) {
    gr.fillRect(x, y, penSize, penSize);
}

// Draw line

function line(x1, y1, x2, y2) {
    gr.beginPath();
    gr.moveTo(x1, y1);
    gr.lineTo(x2, y2);
    gr.stroke();
}

// Draw rectangle

function paintRect(x, y, width, height) {
    gr.fillRect(x, y, width, height);
}

function frameRect(x, y, width, height) {
    gr.strokeRect(x, y, width, height);
}

function clearRect(x, y, width, height) {
	gr.clearRect(x, y, width, height);
}

// Draw oval

function paintOval(x, y, width, height) {
    gr.save();
    gr.translate(x + width / 2, y + height / 2);
    gr.scale(1, height / width);
    gr.beginPath();
    gr.arc(0, 0, width / 2, 0, PI2, true);
    gr.fill();
    gr.closePath();
    gr.restore();
}

function frameOval(x, y, width, height) {
    gr.save();
    gr.translate(x + width / 2, y + height / 2);
    gr.scale(1, height / width);
    gr.beginPath();
    gr.arc(0, 0, width / 2, 0, PI2, true);
    gr.stroke();
    gr.closePath();
    gr.restore();
}

// Draw circle

function paintCircle(x, y, radius) {
    gr.beginPath();
    gr.arc(x, y, radius, 0, PI2, true);
    gr.fill();
}

function frameCircle(x, y, radius) {
    gr.beginPath();
    gr.arc(x, y, radius, 0, PI2, true);
    gr.stroke();
}

// Draw polygon

function openPoly() {
	gr.beginPath();
}

function moveTo(x, y) {
	gr.moveTo(x, y);
}

function lineTo(x, y) {
	gr.lineTo(x, y);
}

function paintPoly() {
	gr.fill();
}

function framePoly() {
	gr.stroke();
}

// Draw image

function loadImage(file) {
	var img = new Image();
	img.src = file;

	return img;
}
	
function drawImage(image, x, y) {
 	gr.drawImage(image, x, y);
}

// Manage HTML element

function getElement(id) {
	return document.getElementById(id);
}

function setElement(id, text) {
	document.getElementById(id).innerHTML = text;
}

function moveElement(id, x, y) {
	var elm = document.getElementById(id);
	
	elm.style.left = x;
	elm.style.top = y;
}

function showElement(id) {
	document.getElementById(id).style.visibility = "visible";
}

function hideElement(id) {
	document.getElementById(id).style.visibility = "hidden";
}

// Handle events

function onEvent(event, handler) {
	document.body.addEventListener(event, handler, false);
}

// Go to a link

function go(url) {
	document.location = url;
}