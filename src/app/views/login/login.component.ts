import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth/auth.service';
import { LoginRegService } from '../../services/loginReg/login-reg.service';
import { TokenService } from '../../services/token/token.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  form_login: FormGroup;
  errorLogin = false;
  constructor(
    private router: Router,
    private login: LoginRegService,
    private token: TokenService,
    private auth: AuthServiceService,
  ) {

    this.form_login = new FormGroup({
      username: new FormControl('', [
        Validators.min(6),
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.min(6),
        Validators.pattern(/^[a-zA-Z0-9_.-]*$/),
        Validators.required
      ])
    });
  }

  get invalidUser() {
    return this.form_login.get('username').invalid && this.form_login.get('username').touched;
  }

  get invalidPass() {
    return this.form_login.get('password').invalid && this.form_login.get('password').touched;
  }

  submitLogin() {
    this.errorLogin = false;
    const sendData = this.form_login.value;
    this.login.login(sendData).subscribe(
      (data: any) => this.handleLogin(data),
      (error: any) => this.handleWrongLogin(error)
    )
  }

  handleLogin(data) {
    const usuData = btoa(JSON.stringify(data))
    this.token.handleToken(usuData);
    this.auth.changeAuhtStatus(true);
    this.router.navigateByUrl('/app');
  }

  handleWrongLogin(error) {
    switch(error.status) {
      case 401:
        this.errorLogin = true;
        this.form_login.reset();
        break;
      case 500:
        this.router.navigateByUrl('/500');
        break;
      default:
        break
    }
  }
}