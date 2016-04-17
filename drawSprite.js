/**
* Draw sprite r0423121742
* @author Josh Gibbs - uPaymeiFixit@gmail.com
*
* Animates a sprite on a canvas using a sprite sheet
*
* Usage:
*	context.drawsprite( ExampleObject, animate[true/false] )
*
* Required object items:
*	image: sprite image
*	x: x position to draw the picture
*	y: y position to draw the picture
*	width or w: width of the object,
*	heigh or h: height of the object
*
* @param   Object   required_items   Default  error
* @param   Boolean  pause_animation  Default  false
*/

var ds_fr=0;
Object.prototype.drawSprite=function(ds_o,ds_a){
	if ( ds_a === undefined || ds_a ) { ds_fr++; }
	this.drawImage( ds_o.image, // image
					( ds_fr % ( ds_o.image.width / (ds_o.width || ds_o.w) ) ) * (ds_o.width || ds_o.w), // start drawing x
					0, // start drawing y
					(ds_o.width || ds_o.w), // width
					(ds_o.height || ds_o.h), // height
					ds_o.x, // x
					ds_o.y, // y
					(ds_o.width || ds_o.w), // width
					(ds_o.height || ds_o.h) ); //height
};