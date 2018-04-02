var canvas = document.getElementById("canvas"); /* catpure the canvas */
var ctx = canvas.getContext("2d"); /* define the context to draw in */

/* define how often updates will occur */
var REFRESH_RATE = 10 // ms
var LOWEST_ENERGY = 20*REFRESH_RATE/1000;

var window_width = window.innerWidth;
var window_height = window.innerHeight;
/* define a width and height for the canvas in pixels */
var canvas_width = window_width;
var canvas_height = window_height;
/* set up the canvas dimensions */
canvas.width = canvas_width;
canvas.height = canvas_height;


/*
 * this class defines an appliance which keeps track of the power and energy
 * information being visualized
 */
var appliances = ["oven", "stove", "blender", "rangehood", "dishwasher"]
var power = {
    "oven": 1000,
    "stove": 5000,
    "blender": 10000,
    "rangehood": 7500,
    "dishwasher": 2500
};

function Appliance(name){ // maybe add power information taken from config
    this.name = name,
    this.running = true,
    this.energy = 0,
    this.switchState = function() {
        this.running = this.running ? false : true;
    },
    this.update = function() {
        if(this.running){
	    console.log(this.energy);
            this.energy += power[name]*(REFRESH_RATE/3600000); // convert to kwh
        }
    },
    this.getEnergy = function() {
        return this.energy;
    },
    this.getPower = function() {
        if(this.running){
            return power[name];
        } else {
            return 0;
        }
    }
}

var NUM_PINWHEELS = 12; // abstract this
var MAX_SIZE = canvas.width/6
var STARTING_SIZE = 100;
var x = MAX_SIZE/2;
var y = MAX_SIZE/2;

var elems = new Array();
for (i = 0; i < NUM_PINWHEELS; i++){
    var p = new ColoredCircle("images/" + i.toString() + "_circle.png",x,y,STARTING_SIZE, canvas_height, canvas_width);
    p.addAppliance(new Appliance(appliances[Math.floor(Math.random() * appliances.length)]));
    elems.push(p);
   x += MAX_SIZE
   if (x + MAX_SIZE/2 > window_width) {
       x = MAX_SIZE/2
       y += MAX_SIZE
   }
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(i = 0; i < elems.length; i++){
        elems[i].draw();
        elems[i].update();
    }
    LOWEST_ENERGY += 20*REFRESH_RATE/1000;
}
setInterval(draw, REFRESH_RATE);

