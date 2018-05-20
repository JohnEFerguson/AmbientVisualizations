var MAX_POWER = 100;
var DATA_REFRESH_RATE = 1000;

function ZilkhaAppliance(name) {
    this.name = name,
    this.power = 0,
    this.energy = 0,
    this.ref = 0,
    this.update = function() {
        this.energy += this.power*(REFRESH_RATE/3600000); // convert to kwh
	if (this.ref >= DATA_REFRESH_RATE) {
	    
	    this.power = get_appliance_power[this.name];
	    this.ref = 0;
	} else this.ref += 1;
    },
    this.get_energy = function() {
        return this.energy;
    },
    this.get_power = function() {
	return this.power;
    },
    this.get_max_power = function() {
	return MAX_POWER;
    }
}


function ZilkhaKitchen() {
    this.zilkha_appliances = [new ZilkhaAppliance("fridge"), new ZilkhaAppliance("microwave"), new ZilkhaAppliance("oven"), new ZilkhaAppliance("stove"), new ZilkhaAppliance("dishwasher")],
    this.get_appliances = function() { return this.zilkha_appliances; }
}

kitchen = new ZilkhaKitchen();
zilkha_appliances = kitchen.get_appliances();
