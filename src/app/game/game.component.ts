import { Component, OnInit } from '@angular/core';

import {BluetoothService} from '../bluetooth/bluetooth.service';
import {LoginService} from '../login/login.service';

import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  constructor(private bluetoothService: BluetoothService, private loginService: LoginService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    if(!this.loginService.isLogged()){
      window.location.href = '/#play';
    }
    if(!this.bluetoothService.isConnected()){
      this.showNotConnectedBar();
    }
  }

  private showNotConnectedBar(){
    this.snackBar.open(
        "Device not connected, you will not progress in the game",
        "Connect", { duration: 0 })
      .onAction().subscribe(() =>
        {this.bluetoothService.connectBluetooth().then( connected =>{
          if(!connected){
            this.showNotConnectedBar();
          }
        }
    )});
  }

}
