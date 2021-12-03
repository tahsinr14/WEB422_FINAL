import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from './../environments/environment';

import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

import User from './User';
import RegisterUser from './RegisterUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor( private http: HttpClient) { }

  getToken() {
    return localStorage.getItem('access_token');
  }

  readToken() {
    let token = this.getToken();
    let helper = new JwtHelperService();

    return token ? helper.decodeToken(token) : null;
  }

  isAuthenticated() {
    let token = this.getToken();

    return token ? true : false;
  }

  login(user: User): Observable<any> {
    return this.http.post(environment.userAPIBase + '/login', user);
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  register(registerUser: RegisterUser): Observable<any> {
    return this.http.post(environment.userAPIBase + '/register', registerUser);
  }
}