/**
* Extra Audio functions r0601122215
* @author Josh Gibbs - uPaymeiFixit@gmail.com
*
*
* Description:
*	Adds extra functions to the native Audio API
*
*
*	playover():
*		Plays the sound without delay. Will overlap the sound if it was not finished.
*		This will usually break the native pause() function. You can use stop() instead.
*
*
*	playloop():
*		Alternative to the native "loop = true"
*
*		There is an optional parameter that sets the duration you want to loop in milliseconds.
*			Note that the file will not actually stop playing until it runs out of time or is
*			manually stopped.
*
*		If you don't use the optional paremeter, you can change Audio.offset (default is 250) to
*			adjust how much of the audio at the end that you want to cut off (Chrome usually adds
*			about 250ms of white space at the end).
*
*
*	stop():
*		stops loops
*		sets audio to beginnign
*		stops audio
*
*
* Usage:
*	Uses a native Audio object
*	ExampleSound = new Audio('http://lotation/to/sound/file.ogg')
*	ExampleSound.playloop(30000) //Loops the file at 30 seconds
*	ExampleSound.stop()
*/

Audio.prototype.playover = function() {
	if (!this.buffer) {
		this.buffer = [this];
	}
	for (var i = 0; i < this.buffer.length; i++) {
		if ( this.buffer[i].paused ) {
			this.buffer[i].volume = this.volume;
			this.buffer[i].play();
			return;
		}
	}
	this.buffer[ this.buffer.push(this.cloneNode()) - 1].play();
	this.buffer[this.buffer.length - 1].loop = false;
};

Audio.file = [];
Audio.offset = 250;
Audio.prototype.playloop = function(dur) {
	dur = dur || this.duration * 1000 - Audio.offset;
	this.stop();
	this.playover();
	if ( !this.playloop.index ) {
		this.playloop.index = Audio.file.push( this ) - 1;
	}
	var func = "Audio.file["+this.playloop.index+"].playover()";
	this.timer = setInterval( func, dur );
};

Audio.prototype.stop = function() {
	if ( this.buffer ) {
		for (var i = 0; i < this.buffer.length; i++) {
			this.buffer[i].pause();
			this.buffer[i].currentTime = 0;
		}
	}
	this.pause();
	if ( this.timer ) {
		clearInterval(this.timer);
	}
	this.currentTime = 0;
};