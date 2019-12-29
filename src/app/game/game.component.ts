import { Component, OnInit } from '@angular/core';

import {BluetoothService} from '../bluetooth/bluetooth.service';
import {LoginService} from '../login/login.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  constructor(private bluetoothService: BluetoothService, private loginService: LoginService) { }

  ngOnInit() {
    if(!this.loginService.isLogged()){
      window.location.href = '/#play';
    }
  }

}
