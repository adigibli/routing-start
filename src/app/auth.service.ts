import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;

  login(){
    this.loggedIn = true;
  }

  logout(){
    this.loggedIn = false;
  }

  isAuthenticated(){
    const promise = new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          resolve(this.loggedIn);
        }, 800);
      }
    );
    return promise;
  }

  constructor() { }
}
