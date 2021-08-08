//Contributions - Used the following arduino example code projects that are in the public domain to help get us started(All are in the public domain)
//    Arduino LSM9DS1 - Simple Gyroscope - written by Riccardo Rizzo - 10 Jul 2019
//    Servo - Sweep - written by BARRAGAN <http:barraganstudio.com> - modified 8 Nov 2013 by Scott Fitzgerald
// Libraries used
//    Arduino_LSM9DS1 - https://www.arduino.cc/en/Reference/ArduinoLSM9DS1 - No Author Listed - Last Revision 25 Dec 2019
//    Servo - https://www.arduino.cc/reference/en/libraries/servo/ - No Author Listed - No Date/Revision Listed

#include <Arduino_LSM9DS1.h>
#include <Servo.h>

Servo outer_servo;
Servo inner_servo;
bool start = false;
int OuterVar;     // stores position of servos
int InnerVar;  // stores position of servos
int oldOuterVar; // stores position of servos
int oldInnerVar; // stores position of servos
unsigned long var_time = millis();

void CoolerDelay(){
  if(millis()-var_time > 100){   // uses millis() so that its only ever getting data every 1/10 of a second
    float x, y, z;
    if (IMU.gyroscopeAvailable()) {
      IMU.readGyroscope(x, y, z);
      Serial.print(x);
      Serial.print('!');
      Serial.print(y);
      Serial.print('`');
      Serial.print(z);
      Serial.print('~');
      var_time = millis();
    }
  }
}

void setup() 
{
    pinMode(LED_BUILTIN, OUTPUT);  // status LED on arduino to tell if TVC is on or off
    Serial.begin(9600); 
    if (!IMU.begin()) {
      Serial.println("Failed to initialize IMU!"); // Prints to serial if the IMU is unable to start up
      while (1);
    }
    outer_servo.attach(5); //servo on pin 5
    inner_servo.attach(6);//servo on pin 6
}
void loop() 
{
   CoolerDelay();
   float x, y, z;
   if (IMU.gyroscopeAvailable()) {
      IMU.readGyroscope(x, y, z);
   }
   if(start){
      OuterVar = map(z, -400, 400, 0, 179);  //maps data from gyro(-2000-2000) to degrees that the servos use(0-180)
      if (OuterVar != oldOuterVar){    //if movement detected
        outer_servo.write(OuterVar);   //move servo to new place
        oldOuterVar = OuterVar;       //set new to old and start all over again
        }
    
      InnerVar = map(y, -400, 400, 179, 0);  //maps data from gyro(-2000-2000) to degrees that the servos use(0-180)
      if (InnerVar != oldInnerVar){   //if movement detected
        inner_servo.write(InnerVar);  //move servo to new place
        oldInnerVar = InnerVar;      //set new to old and start all over again
        }
   }
   char a = Serial.read();     //Basically char a is the current serial character
   if (a == 'o'){    //if a == 'o', which is sent from the On button
    digitalWrite(LED_BUILTIN, HIGH);  // turn on status LED
    outer_servo.attach(5);   //Attaches servos(powers them on)
    inner_servo.attach(6);
    start = true;     //starts TVC
   }
   if (a == 'f'){
    digitalWrite(LED_BUILTIN, LOW);   // turn off status LED
    start = false;   // stops TVC
    outer_servo.detach();    //detatches servos(powers them off)
    inner_servo.detach();
   }
   if (a == 't'){   // t for testing, sent from the testing button
    outer_servo.attach(5);  //power on servos
    inner_servo.attach(6);
      for (int testpos = 80; testpos <= 110; testpos += 1){
        outer_servo.write(testpos);      //Moves outer servo from 80 to 110 degrees
        delay(5);                       //delay between each write to servo as to not fry them
      }
      for (int testpos = 80; testpos <= 110; testpos += 1){  //moves inner servo 
        inner_servo.write(testpos);                         
        delay(5);
      }
      for (int testpos = 110; testpos >= 80; testpos -= 1){  //moves outer servo
        outer_servo.write(testpos);
        delay(5);
      }
      for (int testpos = 110; testpos >= 80; testpos -= 1){  //moves inner servo
        inner_servo.write(testpos);
        delay(5);
      }
     outer_servo.detach();    //power off servos
     inner_servo.detach();
  }
}
