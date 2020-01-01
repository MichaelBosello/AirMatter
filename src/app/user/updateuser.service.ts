import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from '../login/login.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
})}

@Injectable({
  providedIn: 'root'
})
export class UpdateuserService {

  private updateUrl = "/api/v1/user/";

  constructor(private http: HttpClient, private loginService: LoginService) { }

  updateUser(){
    var user = this.loginService.getUser();
    this.http.put(this.updateUrl + user.username, user, httpOptions).subscribe(
      () => {},
      error => {});
  }
}
