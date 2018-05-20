var data = {};
var dataUpdateInterval = 10000;
var applianceDataFeed = '../../data/ApplianceData.csv';

function getCSV(callback, dataFile) {
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

function processData() {
    var record_num = 3;  // or however many elements there are in each row
    var allTextLines = theCSV.split(/\r\n|\n/);
    var entries = allTextLines[0].split(',');
    for (i = 1; i<allTextLines.length-1; i++) {
	var row = allTextLines[i].split(',');
	data[row[0]] = Math.abs(Number(row[2]));
	console.log(row[0]);
    }
}

function get_appliance_power(name) {
    return data[name];
}


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
