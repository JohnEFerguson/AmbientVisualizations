function energy_to_size(energy) { return STARTING_SIZE + energy/50  }
function power_to_density(appliance) { return appliance.get_power()/
appliance.get_max_power(); }
function Coordinate(x, y) {
    this.x = x,
    this.y = y
}
function Hive(path, positions, size){
    this.size = size,
    this.img = new Image(), /* setup the image to draw */
    this.img.src = path,
    this.positions = positions,
    this.appliance = null, /* initialize the associated appliace as null */
    this.power = 0,
    this.energy = 0,
    this.addAppliance = function(appliance){
        this.appliance = appliance;
    },
    this.draw = function() {
	ctx.globalAlpha = 0.65;
	for (var i = 0; i < this.positions.length*power_to_density(this.appliance); i++) {
	    ctx.drawImage(this.img, this.positions[i].x - this.size/2, this.positions[i].y - this.size/2, this.size, this.size); 
	}
    },
    /*
     * get energy and power from the appiance and update internal state
     * accordingly
      */
    this.update = function() {
	this.appliance.update();
   	/* get power */
        if(this.appliance.running){
	    this.power = this.appliance.get_power();
	}
        /*
         * get energy and alter the size of the pinwheel
         */
        this.current_energy = this.appliance.get_energy();
        this.size = Math.min(energy_to_size(this.current_energy),MAX_SIZE);
    }
}
