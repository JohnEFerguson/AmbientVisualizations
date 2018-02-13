Data Visualization for the Zilhka Center Kitchen 
- a tool that takes power and energy usage information from an egauage installed in the Zilhka Center of Williams College and
displays this information as animated circles.  A circle is dedicated to each appliance in the kitchen.  The size of each circle
is determined by the energy usage of the corresponding appliance while the shade of red is depenedent on its power usage.

Authors and Contribtors : Jack Ferguson and Jeannie Albrecht 

Start Date: 01/04/17

Last Edited: 


Files

Circles.js
	controls the animation 

Fetch.py 
	grabs data from the xml data stored in the egauge server

ApplianceAnalysis.py
	Takes the power and energy data from the past month and determines maximum values for 
	each appliance 		    

ApplianceData.csv
	holds the power and energy information of each appliance. Updated every 10 seconds by Fetch.py
	is accessed by Circles.js
		   
