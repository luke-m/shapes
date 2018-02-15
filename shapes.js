function VectorPoint(x, y) {
	this.x = x;
	this.y = y;
}

VectorPoint.prototype.calcDist = function(p) {
	return Math.sqrt( Math.pow((p.x-this.x), 2) + Math.pow((p.y-this.y), 2) );
};

function Triangle(height, center) {
	this.side = (2*height)/Math.sqrt(3);
	this.innerRad = (this.side*Math.sqrt(3))/6;
	this.a = new VectorPoint(center.x, center.y-(height-this.innerRad));
	this.b = new VectorPoint(center.x-(this.side/2), center.y+this.innerRad);
	this.c = new VectorPoint(center.x+(this.side/2), center.y+this.innerRad);
	this.point = new VectorPoint(center.x, center.y-(height-this.innerRad));
	this.omw = 0; // 0 = AB, 1 = BC, 2 = CA
	this.d = 1; // Geschwindigkeit Punkt
}

Triangle.prototype.draw = function() {
	ctx.beginPath();
	ctx.moveTo(this.a.x, this.a.y);
	ctx.lineTo(this.b.x, this.b.y);
	ctx.lineTo(this.c.x, this.c.y);
	ctx.lineTo(this.a.x, this.a.y);
	ctx.stroke();
};

Triangle.prototype.drawPoint = function() {
	ctx.beginPath();
	ctx.arc(this.point.x, this.point.y, 10, 0, 2*Math.PI);
	ctx.fill();
};

Triangle.prototype.movePoint = function() {
	this.drawPoint();
	var way;
	switch(this.omw) {
		case 0:
		way = this.a;
		break;
		case 1:
		way = this.b;
		break;
		case 2:
		way = this.c;
		break;
		default:
		console.log("ERROR");
	}
	if(this.point.calcDist(way) >= this.side) {
		if(this.omw > 1)
			this.omw = 0;
		else
			this.omw++;
	} else {
		switch(this.omw) {
			case 0:
			this.point.x += (this.d/this.side)*(this.b.x - this.a.x);
			this.point.y += (this.d/this.side)*(this.b.y - this.a.y);
			break;
			case 1:
			this.point.x += (this.d/this.side)*(this.c.x - this.b.x);
			this.point.y += (this.d/this.side)*(this.c.y - this.b.y);
			break;
			case 2:
			this.point.x += (this.d/this.side)*(this.a.x - this.c.x);
			this.point.y += (this.d/this.side)*(this.a.y - this.c.y);
			break;
			default:
			console.log("error");
		}
	}

};

var canvas = document.getElementById('cv');
var ctx = canvas.getContext('2d');
var height = canvas.height = window.innerHeight;
var width = canvas.width = window.innerWidth;
var center = new VectorPoint((width/2), (height/2));
var tri = new Triangle(300, center);

requestAnimationFrame(draw);

function draw() {
	requestAnimationFrame(draw);
	ctx.clearRect(0, 0, width, height);
	tri.draw();
	tri.movePoint();
}