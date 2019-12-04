var canvas, ctx;
var lastTime;
var starArray = [];
var starMax;
var displayTimer;
var starColor;

window.addEventListener("load", init, false);
window.addEventListener("resize", resizeCanvas, false);
window.addEventListener("keydown", keyHandler, false);
window.addEventListener("mousemove", keyHandler, false);

function init() {

	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	canvas.focus();

	resizeCanvas();

	starMax = 400;

	for (var i = 0; i < starMax; i++) {
		starArray[i] = new Star({color: starColor});
	}

	starColor = false;
	displayTimer = 2;
	lastTime = Date.now();

	mainLoop();
}

function mainLoop() {
	
	var now = Date.now();
	var elapsed = (now - lastTime) / 1000;
	lastTime = now;
	
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	for (var i = 0; i < starArray.length; i++) {
		starArray[i].update(elapsed);
		starArray[i].draw();
		
		if (!starArray[i].visible) {
			starArray[i] = new Star({color: starColor});
		}
	}

	if (displayTimer > 0) displayTimer -= elapsed;

	displayText();
	
	requestAnimationFrame(mainLoop);
}

function adjustStars(upDown) {

	if (upDown == -1) {
		if (starArray.length >1) {
			starArray.pop();
		}
	} else {
		if (starArray.length < 1500) {
			starArray.push(new Star({color: starColor}));
		}
 	}
}

function resizeCanvas() {
	
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}	

function keyHandler(e) {

	displayTimer = 2;

	var key = e.keyCode;

	if (key == 38) adjustStars(1);
	if (key == 40) adjustStars(-1);
	if (key == 67) starColor = !starColor;
}

function displayText() {

	var x = canvas.width / 2;
	var y = canvas.height / 2;

	if (displayTimer > 0) {
		canvas.style.cursor = "auto";
		ctx.fillStyle = "yellow";
		ctx.font = "normal 18px arial";
		ctx.textAlign = "center";
		ctx.textBaseline = "bottom";
		ctx.fillText("Total Stars: " + starArray.length, x, y);
		ctx.fillText("Color: " + starColor, x, y-20);
		ctx.fillStyle = "gray";
		ctx.font = "10px serif";
		ctx.textBaseline = "bottom";
		ctx.fillText("Designed with JavaScript by Michael Rasmussen", x, canvas.height - 5);
	
	} else {
		canvas.style.cursor = "none";
	}
}