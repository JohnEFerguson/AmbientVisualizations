lvar NUM_PINWHEELS = sim_appliances.length;
var MAX_SIZE = canvas.width/NUM_PINWHEELS;
var STARTING_SIZE = 100;
var x = MAX_SIZE/2;
var y = MAX_SIZE/2;

var elems = new Array();
for (i = 0; i < NUM_PINWHEELS; i++){
    var p = new GrowingPinwheel("images/" + i.toString() + "_pinwheel.png",x,y,STARTING_SIZE);
    p.addAppliance(sim_appliances[i])
    elems.push(p);
   x += MAX_SIZE;
   if (x + MAX_SIZE/2 > canvas.width) {
       x = MAX_SIZE/2;
       y += MAX_SIZE;
   }
}

setInterval(draw, REFRESH_RATE);

