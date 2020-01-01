import { Component, OnInit } from '@angular/core';

import {BluetoothService} from '../bluetooth/bluetooth.service';
import {LoginService} from '../login/login.service';

import {MatSnackBar} from '@angular/material/snack-bar';
import { User } from '../user/user';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  private user: User;
  private spinnerProgress: number = 0;
  private spinnerLabel: string = "Lvl ";

  constructor(private bluetoothService: BluetoothService, private loginService: LoginService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    if(!this.loginService.isLogged()){
      window.location.href = '/#play';
    }
    if(!this.bluetoothService.isConnected()){
      this.showNotConnectedBar();
    }
    this.user = this.loginService.getUser();
    this.updateUserStatus()
    this.user.subscribeUserProgress( this.updateUserStatus.bind(this) );
  }

  private updateUserStatus(){
    this.spinnerProgress = this.user.experience / this.user.getMaxExperience() * 100;
    this.spinnerLabel = "Lvl " + this.user.level
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
