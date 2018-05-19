var NUM_CIRCLES = sim_appliances.length;
var MAX_SIZE = canvas.width/NUM_CIRCLES;
var STARTING_SIZE = 50;
var x = 1;
var y = 1;

var elems = new Array();
for (i = 0; i < NUM_CIRCLES; i++){
    var p = new ColoredCircle("../../images/circles/" + i.toString() + "_circle.png",x,y,STARTING_SIZE,canvas.height,canvas.width);
    p.addAppliance(sim_appliances[i])
    elems.push(p);
    x += MAX_SIZE;
    if (x + MAX_SIZE/2 > canvas.width) {
	x = MAX_SIZE/2;
	y += MAX_SIZE;
    }
}

setInterval(draw, REFRESH_RATE);

