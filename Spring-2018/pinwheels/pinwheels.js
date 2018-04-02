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


function energy_to_size(energy) { return energy * 10 }

function GrowingPinwheel(path,x,y,width,height){
    this.img = new Image(), /* setup the image to draw */
    this.img.src = path,
    this.x = x, /* assign the x coordinate */
    this.y = y, /* assign the y coordinate */
    this.width = width, /* assign the height coordinate */
    this.height = height, /* assign the width coordinate */
    this.appliance = null, /* initialize the associated appliace as null */
    this.power = 0,
    this.energy = 0,
    this.last_size = 0,
    /* assign an appliance to the pinwheel */
    this.addAppliance = function(appliance){
        this.appliance = appliance;
    },
    /* rotate the pinwheel based off of the appliance's power */
    this.draw = function() {
        ctx.save();
        ctx.translate(this.x+this.width/2, this.y+this.height/2);
        ctx.rotate(Math.PI*REFRESH_RATE/300*this.power);
        ctx.drawImage(this.img, -this.width/2, -this.height/2, this.width, this.height);
        ctx.restore();
    },
    /*
     * get energy and power from the appiance and update internal state
     * accordingly
     */
    this.update = function() {
	this.appliance.update();
	/* get power */
        if(this.appliance.running){
            this.power += this.appliance.getPower() / 10000; // 1000 is arbitrary
	}
        /*
         * get energy and alter the size of the pinwheel
         */
        var current_energy = this.appliance.getEnergy();
        var size = Math.min(energy_to_size(current_energy),MAX_SIZE);
	this.width = size;
        this.height = size;
        /* keep the pinwheel in the same position the entire time */
        var center_change = (size - this.last_size)/2;
        this.x -= center_change;
        this.y -= center_change;
        /* store the previous state */
        this.last_size = size;
        this.last_energy = current_energy;
    }
}
