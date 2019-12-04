class Star {

	constructor (settings) {
	
		this.x = this.rnd(0, canvas.width);
		this.y = this.rnd(0, canvas.height);
		this.size = this.rnd(0,.5);
		if(settings.color) {
			this.color = "rgb(" + this.rnd(0,255) + "," + this.rnd(0,255) + "," + this.rnd(0,255) + ")";
		} else {
			this.color = "white";
		}
		this.angle = this.getAngle();
		this.speed = this.rnd(40, 150);
		this.visible = true;
		
	}

	rnd(lower, upper) {
		
		var range = upper - lower;
		return Math.random() * range + lower;
	}
	
	getAngle() {
			
		var x1 = canvas.width/2;
		var x2 = this.x;
		var y1 = canvas.height/2;
		var y2 = this.y;
		
		return Math.atan2(y2-y1, x2-x1);
			
	}
	
	update(elapsed) {
		
		this.x = elapsed * this.speed * Math.cos(this.angle) + this.x;
		this.y = elapsed * this.speed * Math.sin(this.angle) + this.y;
		
		this.speed+=4
		this.size+=.02
		
		if (this.x > canvas.width + 10 || this.x < -10 || this.y > canvas.height + 10 || this.y < -10) this.visible = false;
		
	}
	
	draw() {
		
		ctx.save();
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
		ctx.closePath();
		ctx.fill();
		ctx.restore();
	}
	
}