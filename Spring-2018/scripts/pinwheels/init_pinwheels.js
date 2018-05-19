var NUM_PINWHEELS = 8; // abstract this
var MAX_SIZE = canvas.width/4;
var STARTING_SIZE = 100;
var x = MAX_SIZE/2;
var y = MAX_SIZE/2;
var w = STARTING_SIZE;
var h = STARTING_SIZE;

var elems = new Array();
for (i = 0; i < NUM_PINWHEELS; i++){
    var p = new GrowingPinwheel("images/" + i.toString() + "_pinwheel.png",x,y,w,h);
    p.addAppliance(new Appliance(appliances[Math.floor(Math.random() * appliances.length)]));
    elems.push(p);
   x += MAX_SIZE
   if (x + MAX_SIZE/2 > window_width) {
       x = MAX_SIZE/2
       y += MAX_SIZE
   }
}


setInterval(draw, REFRESH_RATE);

