Canvas = function( color, width, height, x, y )
{
	// Canvas setup
	var context = document.createElement( "canvas" ).getContext( "2d" );
	context.canvas.innerHTML = "Your browser does not fully support HTML5";
	context.canvas.id = document.getElementsByTagName("canvas").length;

	// This needs to work, and is how all of the below CSS should be applied. 
	//context.canvas.setAttribute("background-color","000000");
	//context.canvas."background-color"="#22FF00";

	// Apparently this is depreciated. Find out what the current version is and implement it.
	//context.canvas.ondblclick=this.webkitRequestFullScreen();


	// var css = document.createElement( "style" );
	// css.type = "text/css";
	// css.appendChild(document.createTextNode("* {margin:0; padding:0;} canvas {display: block;} background-color: #222222;"));
	context.resize = function()
	{
		context.width = width || window.innerWidth;
		context.height = height || window.innerHeight;
		context.canvas.width = context.width;
		context.canvas.height = context.height;
	};

	context.resize();


	document.body.appendChild( context.canvas );
	window.onresize = context.resize;


	return context;
};