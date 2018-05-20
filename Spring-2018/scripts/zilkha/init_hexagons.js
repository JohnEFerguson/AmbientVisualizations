var NUM_HEXAGONS = zilkha_appliances.length;
var MAX_SIZE = canvas.width/NUM_HEXAGONS;
var STARTING_SIZE = 30;
var x = 1;
var y = 1;
var over = 10;

positions = new Array();

while (y <= canvas.height+over) {
    while (x <= canvas.width+over) {
	positions.push(new Coordinate(x, y))
	x += STARTING_SIZE;
    }
    x = over*-1;
    y += STARTING_SIZE;
}

var elems = new Array();
for (i = 0; i < NUM_HEXAGONS; i++){
    app_positions = new Array();
    for (j = 0; j < positions.length/NUM_HEXAGONS; j++) {
	var ind = Math.floor(Math.random() * (positions.length))
	app_positions.push(positions[ind])
	positions.splice(ind, 1);
    }
    var hive = new Hive("../../images/hexagons/" + i.toString() + "_hexagon.png", app_positions, STARTING_SIZE);
    hive.addAppliance(zilkha_appliances[i]);
    elems.push(hive);
}

setInterval(draw, REFRESH_RATE);

