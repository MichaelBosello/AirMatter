import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import {BluetoothService} from './bluetooth.service';

@Component({
  selector: 'app-bluetooth',
  templateUrl: './bluetooth.component.html',
  styleUrls: ['./bluetooth.component.scss']
})
export class BluetoothComponent implements OnInit {

  private isBluetoothSupported: boolean = true;
  private connected = false;

  @Output() nextEvent = new EventEmitter<string>();

  constructor(private bluetoothService: BluetoothService) { }

  ngOnInit(){
    this.isBluetoothSupported = this.bluetoothService.isBluetoothSupported();
  }

  connectBluetooth() {
    this.bluetoothService.connectBluetooth().then( connected =>{
      if(connected){
        this.connected = connected;
        this.nextEvent.emit();
        /*this.bluetoothService.getHumidity().then(value => {
          console.log('Humidity: ' + value);
        })
        this.bluetoothService.getTemperature().then(value => {
          console.log('Temperature: ' + value);
        })
        this.bluetoothService.getPollution().then(value => {
          console.log('Pollution: ' + value);
        })*/
      }
    });
  }

}
