function Circle(x, y, r){
	this.x = x;
	this.y = y;
	this.radius = r;
	this.isCollide = false;
}

Circle.prototype.drawObject = function(){
	if(this.isCollide){
		ctx.fillStyle = "rgba(255,0,0,0.5)";
	}
	else{
		ctx.fillStyle = "rgba(0,255,0,0.5)";
	}
	
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
	ctx.closePath();
	ctx.fill();

	ctx.fillStyle = "black";
	ctx.beginPath();
	ctx.arc(this.x, this.y, 2, 0, Math.PI*2, true);
	ctx.closePath();
	ctx.fill();
};

Circle.prototype.move = function(mouse){
	if(mouse.down){
		this.x = mouse.x;
		this.y = mouse.y;
	}
};

Circle.prototype.checkColissionRectangle = function(object){
	if(Math.abs(this.x - object.x) < object.width/2){
		if(Math.abs(this.y - object.y) < object.height/2 + this.radius){
			this.isCollide = true;
			object.isCollide = true;
		}
		else{
			this.isCollide = false;
			object.isCollide = false;
		}
	}
	else if(Math.abs(this.y - object.y) < object.height/2){
		if(Math.abs(this.x - object.x) < object.width/2 + this.radius){
			this.isCollide = true;
			object.isCollide = true;
		}
		else{
			this.isCollide = false;
			object.isCollide = false;
		}
	}
	else{
		if(this.y > object.y){
			if(this.x > object.x){
				if(Math.sqrt(Math.pow(object.x + object.width/2 - this.x, 2) + Math.pow(object.y + object.height/2 - this.y, 2)) < this.radius){
					this.isCollide = true;
					object.isCollide = true;
				}
				else{
					this.isCollide = false;
					object.isCollide = false;
				}
			}
			else{
				if(Math.sqrt(Math.pow(object.x - object.width/2 - this.x, 2) + Math.pow(object.y + object.height/2 - this.y, 2)) < this.radius){
					this.isCollide = true;
					object.isCollide = true;
				}
				else{
					this.isCollide = false;
					this.isCollide = false;
					object.isCollide = false;
				}
			}
		}
		else{
			if(this.x > object.x){
				if(Math.sqrt(Math.pow(object.x + object.width/2 - this.x, 2) + Math.pow(object.y - object.height/2 - this.y, 2)) < this.radius){
					this.isCollide = true;
					object.isCollide = true;
				}
				else{
					this.isCollide = false;
					object.isCollide = false;
				}
			}
			else{
				if(Math.sqrt(Math.pow(object.x - object.width/2 - this.x, 2) + Math.pow(object.y - object.height/2 - this.y, 2)) < this.radius){
					this.isCollide = true;
					object.isCollide = true;
				}
				else{
					this.isCollide = false;
					object.isCollide = false;
				}
			}
		}
	}
};

Circle.prototype.checkColissionRotatingRectangle = function(object){
	var v1x = - object.v1y + object.v2y,
		v1y = object.v1x - object.v2x,
		v2x = - object.v1y + object.v3y,
		v2y = object.v1x - object.v3x,
		vx = this.x - object.x,
		vy = this.y - object.y,
		wx = object.width/2 * Math.cos(object.r),
		wy = object.width/2 * Math.sin(object.r),
		hx = object.height/2 * Math.cos(Math.PI/2 + object.r),
		hy = object.height/2 * Math.sin(Math.PI/2 + object.r),
		w2x = (this.radius + object.width/2) * Math.cos(object.r),
		w2y = (this.radius + object.width/2) * Math.sin(object.r),
		h2x = (this.radius + object.height/2) * Math.cos(Math.PI/2 + object.r),
		h2y = (this.radius + object.height/2) * Math.sin(Math.PI/2 + object.r),
		a1 = this.checkSameSign((vx + wx) * v1x + (vy + wy) * v1y, (vx - wx) * v1x + (vy - wy) * v1y),
		a2 = this.checkSameSign((vx + hx) * v2x + (vy + hy) * v2y, (vx - hx) * v2x + (vy - hy) * v2y);
		
	if(!a1 && !a2){
		this.isCollide = true;
		object.isCollide = true;
	}
	else if(a1 && a2){
		if( Math.sqrt(Math.pow(object.v1x - this.x,2) + Math.pow(object.v1y - this.y,2)) < this.radius ||
			Math.sqrt(Math.pow(object.v2x - this.x,2) + Math.pow(object.v2y - this.y,2)) < this.radius ||
			Math.sqrt(Math.pow(object.v3x - this.x,2) + Math.pow(object.v3y - this.y,2)) < this.radius ||
			Math.sqrt(Math.pow(object.v4x - this.x,2) + Math.pow(object.v4y - this.y,2)) < this.radius){
			this.isCollide = true;
			object.isCollide = true;
		}
		else{
			this.isCollide = false;
			object.isCollide = false;
		}
	}
	else if(a1){
		if(!this.checkSameSign((vx + w2x) * v1x + (vy + w2y) * v1y, (vx - w2x) * v1x + (vy - w2y) * v1y)){
			this.isCollide = true;
			object.isCollide = true;
		}
		else{
			this.isCollide = false;
			object.isCollide = false;
		}
	}
	else{
		if(!this.checkSameSign((vx + h2x) * v2x + (vy + h2y) * v2y, (vx - h2x) * v2x + (vy - h2y) * v2y)){
			this.isCollide = true;
			object.isCollide = true;
		}
		else{
			this.isCollide = false;
			object.isCollide = false;
		}
	}
};

Circle.prototype.checkSameSign = function(x, y){
	return (x > 0 && y > 0) || (x < 0 && y < 0) || (x == 0 && y == 0);
}