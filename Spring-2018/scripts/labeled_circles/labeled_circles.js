/*----- VISUALIZATION CLASS DEFINITIONS -----*/

/*
 * all visualizations must define 2 methods in addition to a constructor
 * 1) draw - this method will be called once in the time period defined
 *           by refresh_rate and should alter the appearance of the
 *           object
 * 2) update - this method will be called once in the time period defined
 *             by refresh_rate and should alter the internal state of the
 *             object based off of the energy and power values of the
 *             object's associated appliance
 */

/*
 * this class deines a pinwheel that  will spin faster as its
 * associated appliance uses more power and will grow as it uses more
 * energy relative to the appliance using the least amount of energy
 *
 * the constructor takes an image path, x and y coordinates in pixels, and
 * a width and height in pixels
 */


function energy_to_size(energy) { return STARTING_SIZE + energy }
function power_to_color(power) { return power }
function get_random_component() { return Math.random() * (2) -1 }


function ColoredCircle(path,x,y,radius,page_height,page_width){
    this.page_height = page_height,
    this.page_width = page_width,
    this.img = new Image(), /* setup the image to draw */
    this.img.src = path,
    this.x = x, /* assign the x coordinate */
    this.y = y, /* assign the y coordinate */
    this.dx = get_random_component(),
    this.dy = get_random_component(),
    this.radius = radius
    this.appliance = null, /* initialize the associated appliace as null */
    this.power = 0,
    this.energy = 0,
    /* assign an appliance to the pinwheel */
    this.addAppliance = function(appliance){
        this.appliance = appliance;
    },
    /* rotate the pinwheel based off of the appliance's power */
    this.draw = function() {
	ctx.drawImage(this.img, this.x - this.radius, this.y - this.radius, this.radius, this.radius);
	ctx.font = "20pt Calibri";
	ctx.fillText(this.appliance.name, this.x - this.radius/2, this.y - this.radius/2);
    },
    /*
     * get energy and power from the appiance and update internal state
     * accordingly
     */
    this.check_wall_collisions = function() {
	if (this.x + this.radius >= this.page_width || this.x - this.radius <= 0) {
	    this.dx *= -1;
	}
	if (this.y + this.radius >= this.page_height || this.y - this.radius <= 0) {
	    this.dy *= -1;
	}
    },
    this.normalize_speeds = function() {
	var magnitude = Math.sqrt(this.dx*this.dx + this.dy*this.dy);
	this.dx = this.dx/(magnitude*10);
	this.dy = this.dy/(magnitude*10);
    },
    this.update_color = function(power) {
	var scaled = Math.floor((this.appliance.get_power() - this.appliance.get_min_power())/(this.appliance.get_max_power() - this.appliance.get_min_power()));
	this.img.src = "images/" + scaled.toString() + "_circle.png";
    },
    this.update = function() {
	this.appliance.update();
	/* get power */
        if(this.appliance.running){
            this.power = this.appliance.get_power();
	}
	this.update_color();
        /*
         * get energy and alter the size of the pinwheel
         */
        var current_energy = this.appliance.get_energy();
        this.radius = Math.min(energy_to_size(current_energy),MAX_SIZE);
	this.check_wall_collisions();
	this.normalize_speeds();
	/* keep the pinwheel in the same position the entire time */
        this.x += this.dx;
        this.y += this.dy;

    }
}
