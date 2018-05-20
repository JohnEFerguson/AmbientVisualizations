var canvas = document.getElementById("canvas"); /* catpure the canvas */
var ctx = canvas.getContext("2d"); /* define the context to draw in */

/* define how often updates will occur */
var REFRESH_RATE = 1 // ms
var window_width = window.innerWidth;
var window_height = window.innerHeight;
 /* define a width and height for the canvas in pixels */
var canvas_width = window_width;
var canvas_height = window_height;
/* set up the canvas dimensions */
canvas.width = canvas_width;
//canvas.height = canvas_height;

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(i = 0; i < elems.length; i++){
	ctx.beginPath();
	ctx.lineWidth="10";
	ctx.strokeStyle="black"
	ctx.rect(0,0,canvas.width,canvas.height);
	ctx.stroke();
	
        elems[i].draw();
        elems[i].update();
    }
}

