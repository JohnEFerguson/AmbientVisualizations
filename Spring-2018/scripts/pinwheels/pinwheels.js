function energy_to_size(energy, min_size) { 
    return min_size + energy/5;
 }
function power_to_speed(appliance) { return appliance.get_power()/appliance.get_max_power()*5; } 

function GrowingPinwheel(path,x,y,size){
    this.img = new Image(), /* setup the image to draw */
    this.img.src = path,
    this.x = x, /* assign the x coordinate */
    this.y = y, /* assign the y coordinate */
    this.min_size = 20;
    this.size = size;
    this.appliance = null, 
    this.power = 0,
    this.energy = 0,
    this.last_size = 0,
    this.addAppliance = function(appliance){
        this.appliance = appliance;
    },

    this.draw = function() {
        ctx.save();
        ctx.translate(this.x+this.size/2, this.y+this.size/2);
        ctx.rotate(Math.PI*REFRESH_RATE/300*this.power);
	if (this.appliance.running) ctx.globalAlpha = 0.65;
	else ctx.globalAlpha = 0;
        ctx.drawImage(this.img, -this.size/2, -this.size/2, this.size, this.size);
        ctx.restore();
    },

    this.update = function() {
	this.appliance.update();
	if (this.appliance.running){
            this.power += power_to_speed(this.appliance); // 1000 is arbitrary
	}
        var current_energy = this.appliance.get_energy();
        this.size = Math.min(energy_to_size(current_energy, this.min_size),MAX_SIZE);
        /* keep the pinwheel in the same position the entire time */
        var center_change = (this.size - this.last_size)/2;
        this.x -= center_change;
        this.y -= center_change;
        /* store the previous state */
        this.last_size = this.size;
        this.last_energy = current_energy;
    }
}
