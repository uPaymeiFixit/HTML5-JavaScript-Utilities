/**
* Simple Collision Detection r0521121920
* @author Josh Gibbs - uPaymeiFixit@gmail.com
*
*
* Usage:
*	ExampleObject1.IntersectsWith( ExampleObject2 )
* Returns: true or false
*
* Object requirements:
*
*	3D
*		Sphere: x, y, z, radius
*		Polygon: x, y, z, width, height, depth
*
*	2D
*		Circle: x, y, radius
*		Rectangle: x, y, width, height
*
*	1D
*		X Line: x, width
*		Y Line: y, height
*		Z Line: z, depth
*
* Alternative names:
*	x: position.x
*	y: position.y
*	z: position.z
*	width: w
*	height: h
*	depth: d
*	radius: r
*
* Warning:
*	If given the wrong input, this method is not
*	guaranteed to throw an error. It may give an
*	incorrect result instead.
*/

Object.prototype.IntersectsWith = function(o) {
//console.log(this);
//console.log(o);
var posx1 = this.position ? this.position.x : null,
	posy1 = this.position ? this.position.y : null,
	posz1 = this.position ? this.position.y : null,
	posx2 = o.position ? o.position.x : null,
	posy2 = o.position ? o.position.y : null,
	posz2 = o.position ? o.position.y : null;
	var ob1 = {
		x: this.x || posx1 || this.y || posy1 || this.z || posz1,
		y: this.y || posy1,
		z: this.z || posz1,
		w: this.width || this.w || this.height || this.h || this.radius || this.r,
		h: this.height || this.h || this.radius || this.r,
		d: this.depth || this.d || this.radius || this.r,
		r: this.radius || this.r
	};
//console.log(ob1);
	var ob2 = {
		x: o.x || posx2 || o.y || posy2 || o.z || posz2,
		y: o.y || posy2,
		z: o.z || posz2,
		w: o.width || o.w || o.height || o.h || o.radius || o.r,
		h: o.height || o.h || o.radius || o.r,
		d: o.depth || o.d || o.radius || o.r,
		r: o.radius || o.r
	};
//console.log(ob2);

// Point of intersects with is
	var c;
	if ( ob1.x != undefined && ob1.w != undefined && ob2.x != undefined && ob2.w != undefined ) {
	//console.log("if x");
		if ( c = pol( ob1.x, ob1.w, ob2.x, ob2.w ) ) {
		//console.log("if col x");
			if ( ob1.y != undefined && ob1.h != undefined && ob2.y != undefined && ob2.h != undefined ) {
			//console.log("if y");
				if ( c = pol( ob1.y, ob1.h, ob2.y, ob2.h ) ) {
				//console.log("if col y");
					if ( ob1.z != undefined && ob1.d != undefined && ob2.z != undefined && ob2.d != undefined ) {
					//console.log("if z");
						if ( c = pol( ob1.z, ob1.h, ob2.z, ob2.d ) ) {
						//console.log("if col z");
							if ( ob1.r != undefined && ob2.r != undefined ) {
							//console.log("if r; colr z");
								return Math.sqrt(
										(ob1.x-ob2.x) * (ob1.x-ob2.x) -
										(ob1.y-ob2.y) * (ob1.y-ob2.y) -
										(ob1.z-ob2.z) * (ob1.z-ob2.z)
										) <= ( ob1.r + ob2.r );
							} else {
							//console.log("else; col z");
								return c;
							}
						} else {
						//console.log("else; false");
							return false;
						}
					} else {
						if ( ob1.r != undefined && ob2.r != undefined ) {
						//console.log("if r; colr y");
							return Math.sqrt(
											(ob1.x-ob2.x) * (ob1.x-ob2.x) -
											(ob1.y-ob2.y) * (ob1.y-ob2.y)
											) <= ( ob1.r + ob2.r );
						} else {
						//console.log("else; col y");
							return c;
						}

					}
				} else {
				//console.log("else; false");
					return false;
				}
			} else {
			//console.log("else; col x");
				return c;
			}
		} else {
		//console.log("else; false");
			return false;
		}
	}
	//console.log("else; throw");
	console.log(o);
	console.log(this);
	throw "Could not get collision type.";


	
	function pol( pos1, add1, pos2, add2 ) {
		if ( ob1.r != undefined && ob2.r != undefined ) {
			pos1 -= add1;
			pos2 -= add2;
			add1 *= 2;
			add2 *= 2;
		}
		return pos1 + add1 >= pos2 && pos2 + add2 >= pos1;
	}

};

/*
basic structure
if x
	if col x
		if y
			if col y
				if z
					if col z
						if r
							colr z
						else
							col z
					else
						false
				else
					if r
						colr y
					else
						col y
			else
				false
		else
			col x
	else
		false
else
	throw
*/


// Object.prototype.IntersectsWith = function(o) {
	
// 	function IW_0D0D(x1,y1,z1, x2,y2,z2) {
// 		return (x1 === x2 && y1 === y2 && z1 === z2);
// 	}
// 	function IW_0D1D(x1, x2, w2) {
// 		return (x1 > x2 && x1 < x2 + w2);
// 	}
// 	function IW_0D2D(x1, y1, x2, y2, w2, h2) {
// 		return IW_0D1D(x1, x2, w2) && IW_0D1D(y1, y2, h2);
// 	}
// 	function IW_0D3D(x1, y1, z1, x2, y2, z2, w2, h2, d2) {
// 		return IW_0D2D(x1, y1, x2, y2, w2, h2) && IW_0D1D(z1, z2, d2);
// 	}

// 	function IW_1D1D(x1,w1, x2,w2) {
// 		return IW_0D1D(x1, x2, w2) || IW_0D1D(x2, x1,);
// 	}
// 	function IW_1D2D(x1,w1, x2,y2,w2,h2) {

// 	}
// 	function IW_1D3D(x1,y1,w1, x2,y2,z2,w2,h2,z2) {

// 	}

// 	function IW_2D3D(x1,y1,w1,h1,  x2,y2,z2,w2,h2,d2) {

// 	}
// 	function IW_2D3D(x1, y1, w1, h1) {

// 	}
// 	function IW_2D3D() {

// 	}

// };