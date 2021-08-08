//Contributions - Again used example code from arduino and the processing foundation.
//    The Processing Foundation - Record Data - By Casey Reas and Ben Fry - available here --> https://processing.org/tutorials/arrays/
//    Arduino - Graph - Author Not Specified - https://www.arduino.cc/en/Tutorial/BuiltInExamples/Graph
//Libraries used
//    controlP5 - By Andreas Schlegel - http://www.sojamo.de/libraries/controlP5/ - Last updated 07/30/2015
//    processing.serial - https://processing.org/reference/libraries/serial/index.html - By The Processing Foundation - No Date/Revision Listed

import controlP5.*;
import processing.serial.*;

Serial port;   // declares serial port object
ControlP5 cp5; //create controlP5 object

PFont font;    //declare fonts
PFont fontSmall;   //declare fonts

float[] storageX;        //graph arrays
float[] storageY;
float[] storageZ;
int inByteX = 0;         //graph storage vars
int inByteY = 0;
int inByteZ = 0;
String TVCstatus = "Off";     //Assorted control variables
boolean portOpenedOnCOM4 = false;
boolean portOpenedOnCOM1 = false;
String portButton;
String portCurrentlyOpen;
String status = "Please Select A Port";

void connectToPort(String arg){ 
  if (portCurrentlyOpen == arg){
    status = "That Port Is \nAlready Open!";
  }
  else{
    port.stop(); // close any port that may be currently open
    port = new Serial(this, arg, 9600);   
    portCurrentlyOpen = arg;
    status = "Connected on " + portButton;
  }
}
 
void setup() {
  port = new Serial(this, "COM1", 9600); //default to COM1 so that the program doesn't break
  storageX = new float[width];      //set arrays to width of screen 
  storageY = new float[width];
  storageZ = new float[width];
  
  size(700, 800);  //window size, (width, height)

  cp5 = new ControlP5(this);     //declare button library
  
  font = createFont("calibri light", 20);    //create fonts
  fontSmall = createFont("calibri light", 15); //create fonts

  cp5.addButton("Abort")          //create button
    .setPosition(50, 60)
    .setSize(100, 80)
    .setFont(font)
   ;
  cp5.addButton("On")          //create button
    .setPosition(50, 160)
    .setSize(100, 80)
    .setFont(font)
   ;
  cp5.addButton("Test")       //create button
    .setPosition(50, 260)
    .setSize(100, 80)
    .setFont(font)
   ;
  cp5.addButton("COM4")       //create button
    .setPosition(175, 275)
    .setSize(50, 40)
    .setFont(font)
   ;
  cp5.addButton("COM3")       //create button
    .setPosition(230, 275)
    .setSize(50, 40)
    .setFont(font)
   ;
  cp5.addButton("COM1")       //create button
    .setPosition(285, 275)
    .setSize(50, 40)
    .setFont(font)
   ;
}   //setup end

void draw() {
  //main GUI
  background(0 , 0 , 150);      //background color of window
  fill(0, 255, 0);              // controls text color
  textFont(font);               // text font
  strokeWeight(2);              //line weight
  text("Very Cool Rocket Control Software", 35, 30); //                             \   writes text, divider lines to screen 
  text("TVC Status: " + TVCstatus, 175, 100);        //                              |
  text(status, 175, 200);//            displays connection status                    |
  textFont(fontSmall);//                                                             |
  text("Made by some VERY cool people - © 2021", 3, 395); //                         |
  stroke(153); //                                                                    |
  line(350, 800, 350, 0);//                                                          |
  line(0, 400, 700, 400);//                                                          |
  strokeWeight(1);//                                                                 |
  line(350, 200, 700, 200);//                                                        |
  line(0, 600, 700, 600);//                                                          |
  text("Version 0.0.1.super.epic", 540, 795);//                                     /
    
  //READ AND GRAPH X
  text("X Gyro - Roll", 355, 395);
  for (int i = storageX.length-1; i > 0; i--) {
    storageX[i] = storageX[i-1];   //shift over data in array by 1(this is how the scrolling graph works)
  }
  float mappedX = map(inByteX, 500, -500, 0, 400);  //map gyro data to graph size
  storageX[0] = mappedX;   //set first index in array to the mapped value of the gyro(this is where data is inputted)
  stroke(127, 34, 255);
  strokeWeight(1);
  for (int i = 1; i < storageX.length; i++){
    line(i+350, storageX[i], i-1+350, storageX[i-1]);   // print the graph lines to the screen
  }
  String portStringX = port.readStringUntil('!');     //Read data from the serial port
  if (portStringX != null){
    portStringX = trim(portStringX);  //trim whitespace if applicable
    inByteX = int(portStringX);    //cast string portStringX to int called inByteX
    println(inByteX); 
  }
  
  //READ AND GRAPH Y
  text("Y Gyro - Pitch ", 5, 795);
  for (int i = storageY.length-1; i > 0; i--) {
    storageY[i] = storageY[i-1];   //shift over data in array by 1(this is how the scrolling graph works)
  }
  float mappedY = map(inByteY, 500, -500, 0, 400);  //map gyro data to graph size
  storageY[0] = mappedY;   // set first index in array to the mapped value of the gyro(this is where data is inputted)
  stroke(127, 34, 255);
  strokeWeight(1);
  for (int i = 1; i < storageY.length-350; i++){
    line(i, (storageY[i])+400, i-1, (storageY[i-1])+400);  // print the graph lines to the screen
  }
  String portStringY = port.readStringUntil('`');  //Read data from the serial port
  if (portStringY != null){
    portStringY = trim(portStringY);    //trim whitespace if applicable
    inByteY = int(portStringY);    //cast string to int called inByteY
    println(inByteY);
  }
  
  //GRAPH Z
  text("Z Gyro - Yaw ", 355, 795);
  for (int i = storageZ.length-1; i > 0; i--) {
    storageZ[i] = storageZ[i-1];    //shift over data in array by 1(this is how the scrolling graph works)
  }
  float mappedZ = map(inByteZ, 500, -500, 0, 400);   //map gyro data to graph size
  storageZ[0] = mappedZ;   // set first index in array to the mapped value of the gyro(this is where data is inputted)
  stroke(127, 34, 255);
  strokeWeight(1);
  for (int i = 1; i < storageZ.length-350; i++){
    line(i+350, (storageZ[i])+400, i-1+350, (storageZ[i-1])+400);   // print the graph lines to the screen
  }
  String portStringZ = port.readStringUntil('~');   //Read data from the serial port
  if (portStringZ != null){
    portStringZ = trim(portStringZ);   //trim whitespace if applicable
    inByteZ = int(portStringZ);    //cast string to int called inByteY
    println(inByteZ);
  }
} //draw() end

void On(){          //button function
  port.write('o');
  TVCstatus = "On";
}

void Abort(){          //button function
  port.write('f');
  TVCstatus = "Aborted";
}

void Test(){          //button function
  port.write('t');
  TVCstatus = "Testing";
}
void COM4(){
  portButton = "COM4";
  connectToPort(portButton);
}
void COM3(){
  portButton = "COM3";
  connectToPort(portButton);
}
void COM1(){
  portButton = "COM1";
  connectToPort(portButton);
}
