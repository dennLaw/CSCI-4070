function Rectangle(x, y, w, h){
	this.x = x;
	this.y = y;
	this.width = w;
	this.height = h;
	this.r = 0;
	this.dr = Math.PI/240;
	this.isCollide = false;
	this.phi = Math.atan(this.height/this.width);
	this.radius = Math.sqrt(Math.pow(this.height/2,2) + Math.pow(this.width/2,2));
	this.v1x = this.x + this.radius * Math.cos(this.phi + this.r);
	this.v1y = this.y + this.radius * Math.sin(this.phi + this.r);
	this.v2x = this.x + this.radius * Math.cos(-this.phi + this.r);
	this.v2y = this.y + this.radius * Math.sin(-this.phi + this.r);
	this.v3x = this.x + this.radius * Math.cos(Math.PI - this.phi + this.r);
	this.v3y = this.y + this.radius * Math.sin(Math.PI - this.phi + this.r);
	this.v4x = this.x + this.radius * Math.cos(Math.PI + this.phi + this.r);
	this.v4y = this.y + this.radius * Math.sin(Math.PI + this.phi + this.r);
}

Rectangle.prototype.drawObject = function(){
	if(this.isCollide){
		ctx.fillStyle = "rgba(255,0,0,0.5)";
	}
	else{
		ctx.fillStyle = "rgba(0,255,0,0.5)";
	}
	
	ctx.beginPath();
	ctx.moveTo(this.v1x, this.v1y);
	ctx.lineTo(this.v2x, this.v2y);
	ctx.lineTo(this.v4x, this.v4y);
	ctx.lineTo(this.v3x, this.v3y);
	ctx.lineTo(this.v1x, this.v1y);
	ctx.closePath();
	ctx.fill();

	ctx.fillStyle = "black";
	ctx.beginPath();
	ctx.arc(this.x, this.y, 2, 0, Math.PI*2, true);
	ctx.closePath();
	ctx.fill();
	
	ctx.fillStyle = "blue";
	ctx.beginPath();
	ctx.arc(this.v1x, this.v1y, 2, 0, Math.PI*2, true);
	ctx.closePath();
	ctx.fill();
	
	ctx.fillStyle = "red";
	ctx.beginPath();
	ctx.arc(this.v2x, this.v2y, 2, 0, Math.PI*2, true);
	ctx.closePath();
	ctx.fill();
	
	ctx.fillStyle = "pink";
	ctx.beginPath();
	ctx.arc(this.v3x, this.v3y, 2, 0, Math.PI*2, true);
	ctx.closePath();
	ctx.fill();
	
	ctx.fillStyle = "black";
	ctx.beginPath();
	ctx.arc(this.x + this.width/2 * Math.cos(this.r), this.y + this.width/2 * Math.sin(this.r), 2, 0, Math.PI*2, true);
	ctx.closePath();
	ctx.fill();
	
	ctx.beginPath();
	ctx.moveTo(this.x, this.y);
	ctx.lineTo(this.x - this.v1y + this.v3y, this.y + this.v1x - this.v3x);
	ctx.closePath();
	ctx.stroke();
};

Rectangle.prototype.move = function(mouse){
//	if(mouse.down){
//		this.x = mouse.x;
//		this.y = mouse.y;
//	}
	this.r += this.dr;
	this.r %= Math.PI;
};

Rectangle.prototype.checkColission = function(object){
	this.calculateVertices();
};

Rectangle.prototype.calculateVertices = function(){
	this.v1x = this.x + this.radius * Math.cos(this.phi + this.r);
	this.v1y = this.y + this.radius * Math.sin(this.phi + this.r);
	this.v2x = this.x + this.radius * Math.cos(-this.phi + this.r);
	this.v2y = this.y + this.radius * Math.sin(-this.phi + this.r);
	this.v3x = this.x + this.radius * Math.cos(Math.PI - this.phi + this.r);
	this.v3y = this.y + this.radius * Math.sin(Math.PI - this.phi + this.r);
	this.v4x = this.x + this.radius * Math.cos(Math.PI + this.phi + this.r);
	this.v4y = this.y + this.radius * Math.sin(Math.PI + this.phi + this.r);
};