function energy_to_size(energy) { return STARTING_SIZE + energy/5 }
function power_to_opacity(appliance) { return appliance.get_power()/appliance.get_max_power(); }
function get_random_component() { return Math.random() * (2) -1 }

function ColoredCircle(path,x,y,diameter,page_height,page_width){
    this.page_height = page_height,
    this.page_width = page_width,
    this.img = new Image(), /* setup the image to draw */
    this.img.src = path,
    this.x = x, /* assign the x coordinate */
    this.y = y, /* assign the y coordinate */
    this.dx = get_random_component(),
    this.dy = get_random_component(),
    this.diameter = diameter
    this.appliance = null, /* initialize the associated appliace as null */
    this.power = 0,
    this.energy = 0,
    this.just_collided = false;
     
    /* assign an appliance to the pinwheel */
    this.addAppliance = function(appliance){
        this.appliance = appliance;
    },
    /* rotate the pinwheel based off of the appliance's power */
    this.draw = function() {
	ctx.globalAlpha = power_to_opacity(this.appliance);
	ctx.drawImage(this.img, this.x, this.y, this.diameter, this.diameter);
	ctx.globalAlpha = 1;
    },
    /*
     * get energy and power from the appiance and update internal state
     * accordingly
     */
    this.check_wall_collisions = function() {
	if (!this.just_collided) {
	    if (this.x + this.diameter >= this.page_width || this.x <= 0) {
		this.dx *= -1;
		this.move();
		this.move();
		this.check_stuck();
	    }
	    if (this.y + this.diameter >= this.page_height || this.y <= 0) {
		console.log(this.x, this.y);
		this.dy *= -1;
		this.move();
		this.move();
		this.check_stuck();
	    }
	} else this.just_collided = false;
    },
    this.move_center = function() {
	this.x = this.page_width/2;
	this.y = this.page_height/3;
    },

    this.check_stuck = function() {
	if (this.just_collided) { 
	    this.move_center();
	    this.just_collided = false;
	} else {
	    this.just_collided = true;
	}
    },
    this.normalize_speeds = function() {
	var magnitude = Math.sqrt(this.dx*this.dx + this.dy*this.dy);
	this.dx = this.dx/(magnitude*10);
	this.dy = this.dy/(magnitude*10);
    },
    this.grow = function() {
	if (!(this.x + this.diameter >= this.page_width - 5 || this.x <= 5 || this.y + this.diameter >= this.page_height - 5|| this.y <= 5)) {
            var current_energy = this.appliance.get_energy();
            this.diameter = Math.min(Math.min(energy_to_size(current_energy),MAX_SIZE), this.diameter + 1);
	}
    },
    this.move = function() {
	this.x += this.dx;
	this.y += this.dy;
    },
    this.update = function() {
	this.appliance.update();
	/* get power */
        if(this.appliance.running){
            this.power = this.appliance.get_power();
	}

	this.check_wall_collisions();
	this.normalize_speeds();
	/* keep the pinwheel in the same position the entire time */
	this.grow()
	this.move();

    }
}
