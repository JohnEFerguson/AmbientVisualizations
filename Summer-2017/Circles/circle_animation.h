/*
(c) Devin Gardella 2015 (dpg3@williams.edu)
(c) Jack Ferguson 2017 (jef1@williams.edu)c
*/
#include "GL/freeglut.h"
#include "GL/gl.h"
#include <ft2build.h>
#include FT_FREETYPE_H
#include "readers/ereader.h"
#include <vector>
#include <fstream>
#include <unistd.h>

struct Position {float x,y;};
struct Motion {float dx,dy;};
struct Color {float x,y,z;};

void makeCircle(float radius, Position pos, Color color);
void renderFunction();
void close_window();
void addDevice(ifstream *myfile, string line, string type);

class Circle {
 public:
  Circle(Position pos, Color color, float radius);
  float    radius;
  float    radius_goal;
  Position pos;
  Motion   mov;
  Color    color;
  float    opacity;
  float    opacity_goal;
  void     draw(float watt_hours);
  void     move();
  void     maintain_speed();
  void     resize();
  void     recolor();
  void     pulse();
};

struct appliance {
  string   name; 
  double   power, energy;
  double   max_power, max_energy;
  bool     on;
  Circle * circle;
};
struct e_device {
  ereader * reader;
  vector<appliance *> *appliances;
  vector<string> *ignore;
};




