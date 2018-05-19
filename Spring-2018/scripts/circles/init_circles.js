var NUM_CIRCLES = 12; // abstract this
var MAX_SIZE = canvas.width/6
var STARTING_SIZE = 100;
var x = MAX_SIZE/2;
var y = MAX_SIZE/2;

var elems = new Array();
for (i = 0; i < NUM_CIRCLES; i++){
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

