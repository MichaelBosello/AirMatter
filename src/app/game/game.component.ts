import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import {BluetoothService} from '../bluetooth/bluetooth.service';
import {LoginService} from '../login/login.service';

import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';

import { User } from '../user/user';
import { LevelupComponent } from '../levelup/levelup.component';
import { GameService } from './game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  @ViewChild('titleWindow', {static: false}) titleWindow: ElementRef;

  private user: User;
  private spinnerProgress: number = 0;
  private spinnerLabel: string = "Lvl ";
  private userLevel: number;

  constructor(private bluetoothService: BluetoothService,
      private loginService: LoginService,
      private snackBar: MatSnackBar,
      private dialog: MatDialog,
      private gameService: GameService) { }

  ngOnInit() {
    if(!this.loginService.isLogged()){
      window.location.href = '/#play';
    }
    if(!this.bluetoothService.isConnected()){
      this.showNotConnectedBar();
    }
    this.user = this.loginService.getUser();
    this.userLevel = this.user.level;

    this.gameService.loadUserProgress();

    this.updateUserStatus()
    this.user.subscribeUserProgress( this.updateUserStatus.bind(this) );
  }

  back(){
    this.titleWindow.nativeElement.style.display = "none";
  }

  private updateUserStatus(){
    this.spinnerProgress = this.user.experience / this.user.getMaxExperience() * 100;
    this.spinnerLabel = "Lvl " + this.user.level

    if(this.userLevel < this.user.level){
      this.levelup();
      this.userLevel = this.user.level;
    }
  }

  private levelup(){
    this.dialog.open(LevelupComponent, {
      height: '92%',
      maxHeight: '406px',
      width: '90%',
      maxWidth: '450px',
      panelClass: 'custom-dialog-container'
    });
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
