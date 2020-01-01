#include <BLEPeripheral.h>
#include <CoreSensors.h>

// create peripheral instance
BLEPeripheral blePeripheral = BLEPeripheral();

// create service
BLEService service = BLEService("1900");

//create characteristic
BLEIntCharacteristic    humidityBLE = BLEIntCharacteristic("3B11", BLERead);
BLEIntCharacteristic    temperatureBLE = BLEIntCharacteristic("3B12", BLERead);
BLEIntCharacteristic    pollutionBLE = BLEIntCharacteristic("3B13", BLERead);

int dustPin=1;
float dustVal=0; 
int ledPower=7;
int delayTime=280;
int delayTime2=40;
float offTime=9680;

void setup() {
  Serial.begin(115200);

  //initialize BLE led
  pinMode(GREEN_LED, OUTPUT);
  pinMode(BLUE_LED, OUTPUT);

  pinMode(ledPower,OUTPUT);
  pinMode(dustPin, INPUT);

  coresensors.begin();

  // set advertised local name and service UUID
  blePeripheral.setLocalName("pollution-device");
  blePeripheral.setAdvertisedServiceUuid(service.uuid());

  // add service and characteristics
  blePeripheral.addAttribute(service);
  blePeripheral.addAttribute(humidityBLE);
  blePeripheral.addAttribute(temperatureBLE);
  blePeripheral.addAttribute(pollutionBLE);

  // begin initialization
  blePeripheral.begin();

  Serial.println("BLE Peripheral");
}


void loop() {
  // poll peripheral
  blePeripheral.poll();


  digitalWrite(ledPower,LOW); 
  delayMicroseconds(delayTime);
  dustVal=analogRead(dustPin); 
  delayMicroseconds(delayTime2);
  digitalWrite(ledPower,HIGH); 
  delayMicroseconds(offTime);

  float dustDensity = 0;
  if (dustVal>36.455)
    dustDensity = (float(dustVal/1024)-0.0356)*120000*0.035;
  

  float humidity, temperature;

  humidity = coresensors.getHumidity();
  temperature = coresensors.getTemperature();

  humidityBLE.setValue(humidity);
  temperatureBLE.setValue(temperature);
  pollutionBLE.setValue(dustDensity);

  // retrieve the peripheral status in order to blink blue when advertising and green when connected
  if(blePeripheral.status() == ADVERTISING){
    digitalWrite(BLUE_LED,HIGH);
    digitalWrite(GREEN_LED,LOW);
    delay(200);
    digitalWrite(BLUE_LED,LOW);
    digitalWrite(GREEN_LED,LOW);
    delay(400);
  }
  else{ // if we are not advertising, we are connected
    digitalWrite(BLUE_LED,LOW);
    digitalWrite(GREEN_LED,HIGH);
    delay(200);
    digitalWrite(BLUE_LED,LOW);
    digitalWrite(GREEN_LED,LOW);
    delay(400);
  }
}
