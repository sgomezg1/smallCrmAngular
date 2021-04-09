import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor() {}

  handleToken(token) {
    this.set(token);
  }

  set(token) {
    localStorage.setItem('token', token);
  }

  get() {
    return localStorage.getItem('token');
  }

  delete() {
    localStorage.removeItem('token');
  }

  isValid() {
    const token = this.get();
    return (token != null) ? true : false;
  }

  loggedIn() {
    return this.isValid();
  }
}