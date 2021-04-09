import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';
import { AuthServiceService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(
    private token: TokenService,
    private auth: AuthServiceService,
    private router: Router
    ) {}

  logout() {
    this.token.delete();
    this.auth.changeAuhtStatus(false);
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
