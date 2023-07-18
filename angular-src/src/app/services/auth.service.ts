import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

const backendUrl = 'https://ultra-ridge-392020.lm.r.appspot.com';
//const backendUrl = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http:HttpClient) { }

  registerUser(user:any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post<any>(backendUrl+'/users/register',
    user,
    {headers: headers,
    observe: 'response'});
  }
  
  authenticateUser(user:any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post<any>(backendUrl+'/users/authenticate',
    user,
    {headers: headers,
    observe: 'response'});
  }

  getProfile() {
    return JSON.parse(localStorage.getItem('user') || '');
  }

  getUserOrders() {
    let userId = { userId:this.getProfile().id}
    let headers = new HttpHeaders(
      {'Content-Type': 'application/json',
      'Authorization': this.authToken});
    return this.http.post<any>(backendUrl+'/orders/getOrders',
    userId,
    {headers: headers,
    observe: 'response'});
  }

  storeUserData(token:any, user:any) {
    localStorage.setItem('id_token',token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn(){
    this.loadToken();
    const helper = new JwtHelperService();
    const isTokenExpired = helper.isTokenExpired(this.authToken); 
    console.log('isTokenExpired:', isTokenExpired)
    return !isTokenExpired;
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

}
