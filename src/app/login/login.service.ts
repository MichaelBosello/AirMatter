import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

import { User } from './user';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
})}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginUrl = "/api/v1/login";
  private registerUrl = "/api/v1/register";

  private user: User;
  
  constructor(private http: HttpClient) { }

  login(username: String, password: String): Observable<User> {
    var loginUser = {
      username: username,
      password: password
    }
    return this.http.post<User>(this.loginUrl, loginUser, httpOptions)
      .pipe(
        //retry(3),
        map(user => this.user = user),
        catchError(this.handleError)
      );
  }

  register(username: String, password: String, email: String): Observable<User> {
    var signupUser = {
      username: username,
      password: password,
      email: email
    }
    return this.http.post<User>(this.registerUrl, signupUser, httpOptions)
      .pipe(
        //retry(3),
        map(user => this.user = user),
        catchError(this.handleError)
      );
  }

  isLogged(): boolean {
    return this.user != null;
  }

  getUser(): User {
    return this.user;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      if (error.error == "incorrect credentials"){
        return throwError(
          "Incorrect credentials");
      }
      if (error.error == "user already exists"){
        return throwError(
          "User already exists, choose another username");
      }
    }
    // return an observable with a user-facing error message
    return throwError(
      "A network error occurred, check your connection and try again");
  }
}
