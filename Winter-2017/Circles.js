/*
 *
 * Script for data visualization with floating circles
 * size - energy
 * color - power
 *
 *
 * Jack Ferguson
 *
 */


// array holds circle objects for each appliance
var circles;

// canvas elements for creating the graphic
var canvas;
var context;

// determines rate that circles are updated
// affects speed of circles
var graphicsInterval = 1;

// how often the egauge data is read from the csv
var dataUpdateInterval = 10000;


var applianceDataFeed = 'ApplianceData.csv';

var limitValueFile = 'LimitValues.csv';

var limitCSV;

var limitValues;

var theCSV;

var data = [];

var minRadius = 30;

var maxRadius = 150;

var topCircleBoarder = 50;

var bottomCircleBoarder;




function main() {

    // intialize canvas elements
    canvas = document.getElementById('myCanvas');
    context = canvas.getContext('2d');

    bottomCircleBoarder = canvas.height * (7/9);


    getCSV(function() {
	    theCSV = this;
	    processData();
	}, applianceDataFeed);


    var first = true;

    setInterval(getCSV, dataUpdateInterval, function() {
            theCSV  = this;
            processData();

	    if (first && data.length != 0) {
		first = false;
	    }
	}, applianceDataFeed);

    getCSV(function() {
	    limitCSV = this;
	    defineLimitValues();
	}, limitValueFile);


    createCircles();

    canvas.addEventListener('mousemove', function(evt) {
	    var mousePos = getMousePos(evt);
	    circleMessage(mousePos);
	    moveCircle(mousePos);

	}, false);

    /*

    // test circles
    var a = {energy: 100, power: 200, radius: 30, radius_goal: 30, name: "washer", color: 10, x: 60, y: 100, dx: .01, dy: .02, free: true};
    var b = {energy: 100, power: 200, radius: 80, radius_goal: 80, name: "fridge", color: 5, x: 400, y: 200, dx: -.01, dy: -.05, free: true};
    var c = {energy: 100, power: 200, radius: 100, radius_goal: 50, name: "stove", color: 1, x: 200, y: 300, dx: .02, dy: -.01, free: true};
    var d = {energy: 100, power: 200, radius: 150, radius_goal: 30, name: "toaster", color: 2, x: 500, y: 300, dx: .01, dy: -.01, free: true};
    var e = {energy: 100, power: 200, radius: 100, radius_goal: 50, name: "blender", color: 1, x: 200, y: 500, dx: .02, dy: -.02, free: true};



    // initalize array of test circles
    window.circles = [a,b,c,d,e];

    */


    // calls updateCircles method at specified interval
    var timer = setInterval(updateCircles, graphicsInterval);
}

// write the applaince data on the top of the canvas
function writeData(i) {

    var appliance = 'Appliance: ' + circles[i].name;
    var power = 'Power: ' + circles[i].power + ' W/s';
    var energy = 'Energy: '+ circles[i].energy + ' W';

    context.clearRect(0, 0, canvas.width, topCircleBoarder);
    context.font = '12pt Times';
    context.fillStyle = 'black';
    context.fillText(appliance, 10, 25);
    context.fillText(power, 310, 25);
    context.fillText(energy, 620, 25);

}

// moves circle with mouse position
function moveCircle(mousePos) {


    for (var i = 0; i<circles.length; i++) {

	for (var j = 0; j<circles.length; j++) {

	    if (i!=j && collided(circles[i], circles[j]))
		return;

	}

        var distance = Math.sqrt((circles[i].x-mousePos.x)*
          (circles[i].x-mousePos.x)+(circles[i].y-mousePos.y)*
          (circles[i].y-mousePos.y));

        if (distance < circles[i].radius) {
            circles[i].x = mousePos.x;
	    circles[i].y = mousePos.y;
		}

    }
}

function circleMessage(mousePos) {

    for (var i = 0; i<circles.length; i++) {

	var distance = Math.sqrt((circles[i].x-mousePos.x)*(circles[i].x-mousePos.x)+
    (circles[i].y-mousePos.y)*(circles[i].y-mousePos.y));

	if (distance < circles[i].radius)
	    writeData(i)

    }
}

function getCSV(callback, dataFile)
{
    var rawFile = new XMLHttpRequest();

    rawFile.open("GET", dataFile, false);

    rawFile.onreadystatechange = function()
	{


	    if(rawFile.readyState === 4)
		{
		    if(rawFile.status === 200 || rawFile.status == 0)
			{


		    if (typeof callback == "function") {
			// apply() sets the meaning of "this" in the callback
			callback.apply(rawFile.responseText);
		    }

			}

		}

	}
    rawFile.send(null);


}

function getMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    return {
	x: evt.clientX - rect.left,
	    y: evt.clientY - rect.top
	    };
}


function getLimitValues(app) {


    for (var i = 0; i<limitValues.length; i++) {

	if (limitValues[i].appliance === app) {
	    var maxEnergy = limitValues[i].energy;
            var maxPower = limitValues[i].power;
            break;
	}
    }


    return {energy: maxEnergy, power: maxPower}

}

function getRadiusAndColor() {




    for (var i = 0; i<circles.length; i++) {

	if (circles[i].free)
	    minRadius = 50;
	else
	    minRadius = 30;

	circles[i].radius_goal = minRadius + circles[i].energy/circles[i].energy_limit
   * (maxRadius - minRadius);

	circles[i].color = circles[i].power/circles[i].power_limit * (10);

    }



}



function createCircles() {


    circles = [];

    var nextSpaceX = maxRadius;
    var nextSpaceY = topCircleBoarder + maxRadius;

    for (var i = 0; i < data.length; i++) {

	if (nextSpaceX + maxRadius > canvas.width) {
	    nextSpaceX = maxRadius;
	    nextSpaceY += maxRadius*2;

	}



	limits = getLimitValues(data[i].appliance);

	var circle = {energy: data[i].energy, energy_limit: limits.energy,
    power: data[i].power, power_limit: limits.power, name: data[i].appliance,
    radius: 0, radius_goal:0, color: 0, x: nextSpaceX, y: nextSpaceY, dx: .01,
    dy: .01, free: true, over_power: false, over_energy: false};


	nextSpaceX += maxRadius;


	circles.push(circle);

    }

}


function defineLimitValues() {

    var record_num = 3;  // or however many elements there are in each row
    var allTextLines = limitCSV.split(/\r\n|\n/);

    var entries = allTextLines[0].split(',');

    limitValues = [];


    for (i = 1; i<allTextLines.length-1; i++) {


        var row = allTextLines[i].split(',');

        var applianceData = {appliance: row[0], energy: Math.abs(Number(row[1]))
          , power : Math.abs(Number(row[2]))}

        limitValues.push(applianceData);


    }


}



function processData() {


    data = [];

    var record_num = 3;  // or however many elements there are in each row
    var allTextLines = theCSV.split(/\r\n|\n/);

    var entries = allTextLines[0].split(',');


    for (i = 1; i<allTextLines.length-1; i++) {


	var row = allTextLines[i].split(',');

	var applianceData = {appliance: row[0], energy: Math.abs(Number(row[1])),
    power : Math.abs(Number(row[2]))}

	data.push(applianceData);


    }

}


function updateCircleData() {

    for (var i = 0; i<data.length; i++) {

	circles[i].energy = data[i].energy;
	circles[i].power = data[i].power;


    }

}


/*
 * updates the position of the circles after checking for collisions
 *
 */
function updateCircles() {

    checkCollisions();
    checkWallCollisions();

    maintainCircleSize();

    checkCircleFreedom();

    moveSmallCirclesDown();

    if (data.length != 0)
	updateCircleData();

    checkPowerOverage();
    checkEnergyOverage();

    getRadiusAndColor();

    maintainSpeed();

    moveCircles();
    updateCanvas();


}



function maintainSpeed() {

    for (var i = 0; i<circles.length; i++) {

	var magnitude = Math.sqrt(circles[i].dx*circles[i].dx + circles[i].dy*circles[i].dy);
	circles[i].dx = circles[i].dx/(magnitude*6);
	circles[i].dy = circles[i].dy/(magnitude*6);

    }


}


function checkEnergyOverage() {


    for (var i = 0; i<circles.length; i++) {

        if (circles[i].over_energy && circles[i].radius != circles[i].goal_radius) {


            circles[i].goal_radius  = circles[i].radius + 10;

        }

    }



}

function checkPowerOverage() {


    for (var i = 0; i<circles.length; i++) {

	if (circles[i].over_power) {

	    circles[i].color = 0;

	}

    }


}

function moveSmallCirclesDown() {

    for (var i = 0; i<circles.length; i++) {

	var collision = false;

	for (var j = 0; j<circles.length; j++) {


	    if (i != j && collided(circles[i], circles[j])) {
		collision = true;
		break;
	    }
	}

	if (!collision && Math.round(circles[i].color) < 1 && circles[i].y < canvas.scrollHeight * (15/16)) {
	    circles[i].dy = .2;

	}


    }

}

function checkCircleFreedom() {

    for (var i = 0; i<circles.length; i++) {

	if (Math.round(circles[i].color) < 1 )
	    circles[i].free = false;

	if (Math.round(circles[i].color) >= 1)
	    circles[i].free = true;
    }

}

function maintainCircleSize() {

    for (var i = 0; i<circles.length; i++) {

	if (circles[i].radius == circles[i].radius_goal)
	    continue;
	else {

	    var difference = circles[i].radius_goal - circles[i].radius;

	    circles[i].radius += difference/100;

	}
    }
}


/*
 * clears the canvas
 *
 */
function clearCircleCanvas() {
    context.clearRect(0, topCircleBoarder, canvas.width, canvas.height);
}


/*
 * determines if any circles have colided and updates vectors of
 * collided circles
 */
function checkCollisions() {

    // keeps track of circle pairs that have already been checked
    // so they are not changed again
    var checked = [];

    for (i = 0; i<window.circles.length; i++) {
	for (j = 0; j<window.circles.length; j++) {

	    if (i != j && !checked.includes(Math.pow(2,i)*Math.pow(3,j)) && collided(window.circles[i],window.circles[j])) {

	 	var updatedCircleVectors = updateCollidingVectors(window.circles[i], window.circles[j]);

		window.circles[i].dx = updatedCircleVectors[0].dx;
		window.circles[i].dy = updatedCircleVectors[0].dy;
		window.circles[j].dx = updatedCircleVectors[1].dx;
		window.circles[j].dy = updatedCircleVectors[1].dy;

		checked.push(Math.pow(2,i)*Math.pow(3,j));
	    }
	}
    }

}


/*
 * pre: colliding circles
 * post: obtains the new vectors for the circles using the reflection of their
 * of their current vectors about the axis between their centers
 */
function updateCollidingVectors(circle1, circle2) {


    var axisVector1 = {dx:circle1.x - circle2.x, dy:circle1.y - circle2.y};
    var axisVector2 = {dx:circle1.x - circle2.x, dy:circle1.y - circle2.y};
    var angle1 = (getVectorAngle(axisVector2, {dx:circle1.dx, dy:circle1.dy}));
    var newVector1 = {dx: circle1.dx * Math.cos(angle1) + circle1.dy * Math.sin(angle1),
		      dy: -1* circle1.dx * Math.sin(angle1) + circle1.dy * Math.cos(angle1)}

    var axisVector2 = {dx:circle1.x - circle2.x, dy:circle1.y - circle2.y};
    var angle2 = 2*(2*Math.PI - getVectorAngle(axisVector1, {dx:circle2.dx, dy:circle2.dy}));
    var newVector2 = {dx: circle2.dx * Math.cos(angle2) + circle2.dy * Math.sin(angle2),
                      dy: -1* circle2 .dx * Math.sin(angle2) + circle2.dy* Math.cos(angle2)}

    return [newVector1, newVector2];



}

/*
 * pre: two vectors
 * post: returns the angle between them
 */
function getVectorAngle(u,v) {

    var dotProduct = u.dx*v.dx + u.dy*v.dy;
    var magnitudeProduct = Math.sqrt(u.dx*u.dx + u.dy*u.dy) * Math.sqrt(v.dx*v.dx + v.dy*v.dy);

    if (dotProduct/magnitudeProduct > 1)
	return Math.acos(1);
    if (dotProduct/magnitudeProduct < -1)
	return Math.acos(-1);

    return Math.acos(dotProduct/magnitudeProduct);

}

/*
 * pre: two circle objects
 * post: returns true if they are intersecting or touching
 * else returns false
 */
function collided(circle1, circle2) {

    var maxDistance = circle1.radius + circle2.radius;
    var x1 = circle1.x;
    var y1 = circle1.y;
    var x2 = circle2.x;
    var y2 = circle2.y;

    var distance = Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));

    if (distance <= maxDistance+1)
	return true;
    else
	return false;

}

/*
 * post: updates the vectors if circles that have collided with
 * any of the boarders
 */
function checkWallCollisions() {

    var width = canvas.scrollWidth;
    var height = canvas.scrollHeight;

    for (i = 0; i<window.circles.length; i++) {


	if (circles[i].free) {

	    if (window.circles[i].y + window.circles[i].radius >= height  ||
        window.circles[i].y - window.circles[i].radius <= topCircleBoarder)
		      window.circles[i].dy *= -1;

	} else {

	    if (window.circles[i].y + window.circles[i].radius >= height ||
        window.circles[i].y - window.circles[i].radius <= bottomCircleBoarder)
                window.circles[i].dy *= -1;
	}


	if (window.circles[i].x + window.circles[i].radius >= width ||
    window.circles[i].x - window.circles[i].radius <= 0)
	    window.circles[i].dx *= -1;


    }



}

/*
 * post: updates the position of each circle according to their vectors
 *
 */
function moveCircles() {

    for (i = 0; i< window.circles.length; i++) {

	window.circles[i].x += window.circles[i].dx;
	window.circles[i].y += window.circles[i].dy;

    }


}

/*
 * post: adds each circle to the canvas
 *
 */
function updateCanvas() {

    clearCircleCanvas();

    for (i = 0; i<window.circles.length; i++) {
	paintCircle(window.circles[i]);
    }


}

function getRGBCode(n) {


    if (n>10)
	n = 10;

    var r = 200;
    var g = 200;
    var b = 200;

    switch(Math.round(n)) {
    case 1:
        r = 244;
	g = 194;
	b = 194;
	    break;
    case 2:
	r = 255;
	g = 105;
	b = 97;
	break;
    case 3:
	r = 255;
	g = 92;
	b = 92;
	break;
    case 4:
	r = 255;
	g = 28;
	b = 0;
	break;
    case 5:
	r = 255;
	g = 8;
	b = 0;
	break;
    case 6:
	r = 255;
	g = 0;
	b = 0;
	break;
    case 7:
	r = 205;
	g = 92;
	b = 92;
	break;
    case 8:
	r = 227;
	g = 66;
	b = 52;
	break;
    case 9:
	r = 252;
	g = 59;
	b = 62;
	break;
    case 10:
	r = 206;
	g = 22;
	b = 32;
	break;
    }
    return 'rgb('+ r +','+ b +','+ b +')';

}


function fontSize(text, radius) {

    for (var i = 0; i<20; i++) {

	context.font = i + 'pt Calibri';

	if (context.measureText(text).width >= 3/2 * radius)
	    return i;
    }

}


/*
 * pre: a circle object
 * post: paints the circle on the canvas
 */
function paintCircle(circle) {


    context.fillStyle = getRGBCode(circle.color);
    context.beginPath();
    context.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
    context.closePath();
    context.fill();
    context.fillStyle = 'white'; // font color to write the text with
    context.font = fontSize(circle.name, circle.radius) + 'pt Calibri';

    // Move it down by half the text height and left by half the text width
    var width = context.measureText(circle.name).width;
    var height = context.measureText("w").width; // this is a GUESS of height
    window.context.fillText(circle.name, circle.x - (width/2) ,circle.y + (height/2));


}
