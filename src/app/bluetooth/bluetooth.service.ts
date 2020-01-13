import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BluetoothService {

  private mobileNavigatorObject: any = window.navigator;
  private humidityCharacteristic: any;
  private temperatureCharacteristic: any;
  private pollutionCharacteristic: any;

  private connected = false;

  constructor() { }

  isBluetoothSupported():boolean {
    if(this.mobileNavigatorObject && this.mobileNavigatorObject.bluetooth) {
      return true;
    } else {
      return false;
    }
  }

  isConnected(): boolean { return this.connected}

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
      this.connected = true;
      return this.connected;
    })
		.catch(error => {
      this.connected = false;
      return this.connected 
    });
  }

  getHumidity():any{
    return this.humidityCharacteristic.readValue()
    .then(value => {
      return value.getUint8(0);
    });
  }

  getTemperature():any{
    return new Promise(r => setTimeout(r, 200)).then(r => {
      this.temperatureCharacteristic.readValue()
      .then(value => {
        return value.getUint8(0);
      })
    })
  }

  getPollution():any{
    return new Promise(r => setTimeout(r, 400)).then(r => {
      this.pollutionCharacteristic.readValue()
      .then(value => {
        return value.getUint8(0);
      })
    })
  }

}
