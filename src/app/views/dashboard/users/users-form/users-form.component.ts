import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Users } from '../../../../interfaces/users';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss']
})
export class UsersFormComponent implements OnInit {
  userForm: FormGroup;
  @Input('disableFields') disableFields;
  @Input('formData') formData;
  @Input('titleType') titleType; // Can be 1 for add, 2 for preview, 3 for edit
  @Output() returnForm: EventEmitter<any> = new EventEmitter();
  @Output() exitForm: EventEmitter<any> = new EventEmitter();
  arrUsers: Users[] = [];
  constructor() {
    this.userForm = new FormGroup({
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
    return this.userForm.get('address').invalid && this.userForm.get('address').touched;
  }

  get invalidBankName() {
    return this.userForm.get('bankName').invalid && this.userForm.get('bankName').touched;
  }

  get invalidBic() {
    return this.userForm.get('bic').invalid && this.userForm.get('bic').touched;
  }

  get invalidCity() {
    return this.userForm.get('city').invalid && this.userForm.get('city').touched;
  }

  get invalidCompanyName() {
    return this.userForm.get('companyName').invalid && this.userForm.get('username').touched;
  }

  get invalidCountry() {
    return this.userForm.get('country').invalid && this.userForm.get('country').touched;
  }

  get invalidEmail() {
    return this.userForm.get('email').invalid && this.userForm.get('email').touched;
  }

  get invalidBuch() {
    return this.userForm.get('firmenbuchnummer').invalid && this.userForm.get('firmenbuchnummer').touched;
  }

  get invalidFirstName() {
    return this.userForm.get('firstName').invalid && this.userForm.get('firstName').touched;
  }

  get invalidIban() {
    return this.userForm.get('iban').invalid && this.userForm.get('iban').touched;
  }

  get invalidLastName() {
    return this.userForm.get('lastName').invalid && this.userForm.get('lastName').touched;
  }

  get invalidPhone() {
    return this.userForm.get('phone').invalid && this.userForm.get('phone').touched;
  }

  get invalidRole() {
    return this.userForm.get('roles').invalid && this.userForm.get('roles').touched;
  }

  get invalidzipCode() {
    return this.userForm.get('zipCode').invalid && this.userForm.get('zipCode').touched;
  }

  get invalidUid() {
    return this.userForm.get('uid').invalid && this.userForm.get('uid').touched;
  }

  get invalidUser() {
    return this.userForm.get('username').invalid && this.userForm.get('username').touched;
  }

  get invalidPass() {
    return this.userForm.get('password').invalid && this.userForm.get('password').touched;
  }

  ngOnInit(): void {
    this.disableAllFields();
    this.fillUserForm();
    if (this.titleType == 3) {
      this.userForm.removeControl('password');
    }
  }

  fillUserForm() {
    if (this.formData !== undefined || this.formData.length > 0) {
      const dataFromParent = this.formData;
      this.userForm.get('address').patchValue(dataFromParent.address);
      this.userForm.get('bankName').patchValue(dataFromParent.bankName);
      this.userForm.get('bic').patchValue(dataFromParent.bic);
      this.userForm.get('city').patchValue(dataFromParent.city);
      this.userForm.get('companyName').patchValue(dataFromParent.companyName);
      this.userForm.get('country').patchValue(dataFromParent.country);
      this.userForm.get('email').patchValue(dataFromParent.email);
      this.userForm.get('firmenbuchnummer').patchValue(dataFromParent.firmenbuchnummer);
      this.userForm.get('firstName').patchValue(dataFromParent.firstName);
      this.userForm.get('iban').patchValue(dataFromParent.iban);
      this.userForm.get('lastName').patchValue(dataFromParent.lastName);
      this.userForm.get('phone').patchValue(dataFromParent.phone);
      this.userForm.get('roles').patchValue(dataFromParent.roles[0]);
      this.userForm.get('uid').patchValue(dataFromParent.uid);
      this.userForm.get('username').patchValue(dataFromParent.username);
      this.userForm.get('zipCode').patchValue(dataFromParent.zipCode);
      this.userForm.get('password').patchValue(dataFromParent.password);
    } else {
      this.userForm.reset();
      this.formData = [];
    }
  }

  disableAllFields() {
    if (this.disableFields == true) {
      this.userForm.disable();
    }
  }

  returnData() {
    this.returnForm.emit(this.userForm.value);
  }

  returnCancel() {
    this.exitForm.emit(false);
  }
}
