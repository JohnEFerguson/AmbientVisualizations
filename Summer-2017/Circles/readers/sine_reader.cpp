/* 
An example of a ereader, written for testing and debugging purposes.
(c) Devin Gardella 2015 (dpg3@williams.edu)
*/

#include "ereader.h"
#include "sine_reader.h"
#include <stdio.h>
#include <stdlib.h>
#include <math.h>

sine_reader::sine_reader(){
  sine_reader::init();
}

sine_reader::~sine_reader(){

}

string sine_reader::getType(){
  return "sine";
}

int sine_reader::getNumDevices(){
  return 3;
}

void sine_reader::init(){
  sine_reader::t = 0.0;
  sine_reader::x = 0.0;
  sine_reader::y = 0.0;
  return;
}

vector<reading> sine_reader::getNewReadings(){
  reading cur1;
  cur1.deviceID = "sine-1";
  cur1.data = (sine_reader::t) +  1;
  t += .1;
  vector<reading> readings;
  readings.push_back(cur1);

  reading cur2;
  cur2.deviceID = "sine-2";
  cur2.data = sin(sine_reader::x) * 10 + 20;
  x += .00001;
  readings.push_back(cur2);

  reading cur3;
  cur3.deviceID = "sine-3";
  cur3.data = (sine_reader::y) * 2;
  y += .01;
  readings.push_back(cur3);

  return readings;
}

void sine_reader::shutdown(){
 
}
