import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private loggedIn = new BehaviorSubject<boolean>(this.token.loggedIn());
  authStatus = this.loggedIn.asObservable();
  constructor(private token: TokenService) {}
  changeAuhtStatus(value: boolean) {
    this.loggedIn.next(value);
  }
}
