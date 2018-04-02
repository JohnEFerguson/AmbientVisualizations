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
function power_to_density(power) { return 10 + power * 100 }// change
function Hive(path, positions, size){
    this.size = size,
    this.img = new Image(), /* setup the image to draw */
    this.img.src = path,
    this.positions = positions,
    this.appliance = null, /* initialize the associated appliace as null */
    this.power = 0,
    this.energy = 0,
    /* assign an appliance to the pinwheel */
    this.addAppliance = function(appliance){
        this.appliance = appliance;
    },
    /* rotate the pinwheel based off of the appliance's power */
    this.draw = function() {
	for (var i = 0; i < this.positions.length; i++) {
	    ctx.drawImage(this.img, this.positions[i].x, this.positions[i].y, this.size, this.size); 
	}
    },
    /*
     * get energy and power from the appiance and update internal state
     * accordingly
     */
    this.test = function(){ console.log("this works") },
    
    this.update = function() {
	this.appliance.update();
	/* get power */
        if(this.appliance.running){
            this.power = this.appliance.getPower();
	}
        /*
         * get energy and alter the size of the pinwheel
         */
        this.current_energy = this.appliance.getEnergy();
        this.size = Math.min(energy_to_size(this.current_energy),MAX_SIZE);
    }
}
