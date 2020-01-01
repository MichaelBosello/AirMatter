import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from './login.service';
import { User } from '../user/user';

import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private username: string;
  private password: string;
  private email: string;

  private isLogin: boolean = true;
  private buttonDisabled: boolean = false;

  public user: User;

  @Output() nextEvent = new EventEmitter<string>();

  constructor(private loginService: LoginService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.user = this.loginService.getUser();
  }

  login(){
    this.buttonDisabled = true;
    this.loginService.login(this.username, this.password)
      .subscribe(
        user => {
          this.user = user;
          this.nextEvent.emit();
        },
        error => {
          this.snackBar.open(error, "", { duration: 2600 })
          this.buttonDisabled = false;
        });
  }

  register(){
    this.buttonDisabled = true;
    this.loginService.register(this.username, this.password, this.email)
      .subscribe(
        user => {
          this.user = user;
          this.nextEvent.emit();
        },
        error => {
          this.snackBar.open(error, "", { duration: 2600 })
          this.buttonDisabled = false
        });
  }

}
