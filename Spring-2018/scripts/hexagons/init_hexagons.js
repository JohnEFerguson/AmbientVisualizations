positions = new Array();
var MAX_SIZE = canvas.width/10;
var STARTING_SIZE = 30;
var over = 10;
var x = over*-1;
var y = x;
while (y <= canvas.height+over) {
    while (x <= canvas.width+over) {
	positions.push(new Coordinate(x, y))
	x += STARTING_SIZE;
    }
    x = over*-1;
    y += STARTING_SIZE;
}

var elems = new Array();
for (i = 0; i < appliances.length; i++){
    app_positions = new Array();
    for (j = 0; j < positions.length/appliances.length; j++) {
	var ind = Math.floor(Math.random() * (positions.length))
	app_positions.push(positions[ind])
	positions.splice(ind, 1);
    }
    var hive = new Hive("images/" + i.toString() + "_hexagon.png", app_positions, STARTING_SIZE);
    hive.addAppliance(new Appliance(appliances[Math.floor(Math.random() * appliances.length)]));
    elems.push(hive);
}


setInterval(draw, REFRESH_RATE);

