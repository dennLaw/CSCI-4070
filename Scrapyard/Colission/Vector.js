function Vector(int x, int y){
	this.x = x;
	this.y = y;
}

Vector.prototype.dot(v){
	return this.x * v.x + this.y * v.y;
}