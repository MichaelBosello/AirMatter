import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BluetoothService {

  private mobileNavigatorObject: any = window.navigator;
  private humidityCharacteristic: any;
  private temperatureCharacteristic: any;
  private pollutionCharacteristic: any;

  constructor() { }

  isBluetoothSupported():boolean {
    if(this.mobileNavigatorObject && this.mobileNavigatorObject.bluetooth) {
      return true;
    } else {
      return false;
    }
  }

  connectBluetooth():any {
    return this.mobileNavigatorObject.bluetooth.requestDevice({ filters: [{ services: [0x1900] }] })
    .then(device => { 
      console.log(device.name);
      return device.gatt.connect();
    })
    .then(server => {
      return server.getPrimaryService(0x1900);
    })
    .then(service => {
      return Promise.all([
        service.getCharacteristic(0x3B11),
        service.getCharacteristic(0x3B12),
        service.getCharacteristic(0x3B13)]);
    })
    .then(characteristic => {
      this.humidityCharacteristic = characteristic[0];
      this.temperatureCharacteristic = characteristic[1];
      this.pollutionCharacteristic = characteristic[2];
      return true;
    })
		.catch(error => { return false });
  }

  getHumidity():any{
    return this.humidityCharacteristic.readValue()
    .then(value => {
      return value.getUint8(0);
    });
  }

  getTemperature():any{
    return this.temperatureCharacteristic.readValue()
    .then(value => {
      return value.getUint8(0);
    });
  }

  getPollution():any{
    return this.pollutionCharacteristic.readValue()
    .then(value => {
      return value.getUint8(0);
    });
  }

}
