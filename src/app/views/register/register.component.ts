import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRegService } from '../../services/loginReg/login-reg.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent {
  registerForm: FormGroup;
  successReg = false;
  loadingSubmit = false;
  constructor(
    private login: LoginRegService,
    private router: Router
  ) {
    this.registerForm = new FormGroup({
      address: new FormControl('', [
        Validators.min(6),
        Validators.required
      ]),
      bankName: new FormControl('', [
        Validators.min(3),
        Validators.required
      ]),
      bic: new FormControl('', [
        Validators.min(3),
        Validators.required
      ]),
      city: new FormControl('', [
        Validators.min(3),
        Validators.required
      ]),
      companyName: new FormControl('', [
        Validators.min(3),
        Validators.required
      ]),
      country: new FormControl('', [
        Validators.min(3),
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.min(3),
        Validators.required,
        Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      ]),
      firmenbuchnummer: new FormControl('', [
        Validators.min(3),
        Validators.required
      ]),
      firstName: new FormControl('', [
        Validators.min(3),
        Validators.required
      ]),
      iban: new FormControl('', [
        Validators.min(3),
        Validators.required
      ]),
      lastName: new FormControl('', [
        Validators.min(3),
        Validators.required
      ]),
      phone: new FormControl('', [
        Validators.min(3),
        Validators.required,
        Validators.pattern(/^[0-9]*$/)
      ]),
      roles: new FormControl('', [
        Validators.min(3),
        Validators.required
      ]),
      uid: new FormControl('', [
        Validators.min(3),
        Validators.required
      ]),
      username: new FormControl('', [
        Validators.min(3),
        Validators.required
      ]),
      zipCode: new FormControl('', [
        Validators.min(3),
        Validators.required,
        Validators.pattern(/^[0-9]*$/)
      ]),
      password: new FormControl('', [
        Validators.min(3),
        Validators.required,
        Validators.pattern(/[A-Za-z0-9]*([a-zA-Z]+[0-9]+|[0-9]+[a-zA-Z]+)/),
      ]),
    });
  }

  get invalidAddress() {
    return this.registerForm.get('address').invalid && this.registerForm.get('address').touched;
  }

  get invalidBankName() {
    return this.registerForm.get('bankName').invalid && this.registerForm.get('bankName').touched;
  }

  get invalidBic() {
    return this.registerForm.get('bic').invalid && this.registerForm.get('bic').touched;
  }

  get invalidCity() {
    return this.registerForm.get('city').invalid && this.registerForm.get('city').touched;
  }

  get invalidCompanyName() {
    return this.registerForm.get('companyName').invalid && this.registerForm.get('username').touched;
  }

  get invalidCountry() {
    return this.registerForm.get('country').invalid && this.registerForm.get('country').touched;
  }

  get invalidEmail() {
    return this.registerForm.get('email').invalid && this.registerForm.get('email').touched;
  }

  get invalidBuch() {
    return this.registerForm.get('firmenbuchnummer').invalid && this.registerForm.get('firmenbuchnummer').touched;
  }

  get invalidFirstName() {
    return this.registerForm.get('firstName').invalid && this.registerForm.get('firstName').touched;
  }

  get invalidIban() {
    return this.registerForm.get('iban').invalid && this.registerForm.get('iban').touched;
  }

  get invalidLastName() {
    return this.registerForm.get('lastName').invalid && this.registerForm.get('lastName').touched;
  }

  get invalidPhone() {
    return this.registerForm.get('phone').invalid && this.registerForm.get('phone').touched;
  }

  get invalidRole() {
    return this.registerForm.get('roles').invalid && this.registerForm.get('roles').touched;
  }

  get invalidzipCode() {
    return this.registerForm.get('zipCode').invalid && this.registerForm.get('zipCode').touched;
  }

  get invalidUid() {
    return this.registerForm.get('uid').invalid && this.registerForm.get('uid').touched;
  }

  get invalidUser() {
    return this.registerForm.get('username').invalid && this.registerForm.get('username').touched;
  }

  get invalidPass() {
    return this.registerForm.get('password').invalid && this.registerForm.get('password').touched;
  }
  
  createUser() {
    const dataSend = this.registerForm.value;
    this.login.createUser(dataSend).subscribe(
      (data: any) => {
        this.successReg = true;
        this.loadingSubmit = true;
        setTimeout(() => {
          this.router.navigateByUrl('/login')
        }, 4000);
      }
    )
  }
}
