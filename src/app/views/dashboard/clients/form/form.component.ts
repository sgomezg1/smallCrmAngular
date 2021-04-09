import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Bills } from '../../../../interfaces/bills';
import { BillsService } from '../../../../services/bills/bills.service';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input('disableFields') disableFields;
  @Input('formData') formData;
  @Input('titleType') titleType; // Can be 1 for add, 2 for preview, 3 for edit
  @Output() returnForm: EventEmitter<any> = new EventEmitter();
  @Output() exitForm: EventEmitter<any> = new EventEmitter();
  bills: Bills[] = [];
  checkedBills: any[] = [];
  clientForm: FormGroup;
  constructor(
    private billsServ: BillsService
  ) {
    this.clientForm = new FormGroup({
      id: new FormControl(),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl('',  [
        Validators.required,
        Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      ]),
      phone: new FormControl('',  [
        Validators.required,
        Validators.pattern("^[0-9]*$")
      ]),
      country: new FormControl('',  Validators.required),
      city: new FormControl('',  Validators.required),
      address: new FormControl('',  Validators.required),
      zipCode: new FormControl('',  [
        Validators.required,
        Validators.pattern("^[0-9]*$")
      ]),
      companyName: new FormControl('',  Validators.required),
      // bills: new FormArray([], Validators.required),
      createdAt: new FormControl(),
      updatedAt: new FormControl()
    });
    this.getAllBills();
  }

  get emailInvalid() {
    return this.clientForm.get('email').invalid && this.clientForm.get('email').touched;
  }

  get phoneInvalid() {
    return this.clientForm.get('phone').invalid && this.clientForm.get('phone').touched;
  }

  get countryInvalid() {
    return this.clientForm.get('country').invalid && this.clientForm.get('country').touched;
  }

  get cityInvalid() {
    return this.clientForm.get('city').invalid && this.clientForm.get('city').touched;
  }

  get addressInvalid() {
    return this.clientForm.get('address').invalid && this.clientForm.get('address').touched;
  }

  get zipCodeInvalid() {
    return this.clientForm.get('zipCode').invalid && this.clientForm.get('zipCode').touched;
  }

  get companyInvalid() {
    return this.clientForm.get('address').invalid && this.clientForm.get('address').touched;
  }
  
  /* get billsInvalid() {
    return this.clientForm.get('bills').invalid && this.clientForm.get('bills').touched;
  } */



  ngOnInit(): void {
    this.disableAllFields();
  }

  validBillCheck(billId: string): boolean {
    let retorno = false;
    const billFind = this.checkedBills.find(x => x === billId);
    if (billFind !== undefined) {
      retorno = true;
    }
    return retorno;
  }

  fillClientForm() {
    if (this.formData !== undefined) {
      const dataFromParent = this.formData;
      Object.keys(dataFromParent).forEach((i, el) => {
        this.clientForm.get(i).patchValue(dataFromParent[i]);
      });
      // const clientId = this.clientForm.get('id').value;
      // this.getClientBills(clientId);
    } else {
      this.clientForm.reset();
      this.checkedBills = [];
      this.formData = [];
    }
  }

  pushBillControl(id: string, index: number, event: any) {
    const bills = this.clientForm.get('bills') as FormArray;
    if (event.target.checked) {
      this.checkedBills.push(id);
      bills.push(new FormControl(id));
    } else {
      const index = this.checkedBills.indexOf(id);
      if (index > -1) { this.checkedBills.splice(index, 1); }
      bills.removeAt(index);
    }
  }

  disableAllFields() {
    if (this.disableFields == true) {
      this.clientForm.disable();
    }
  }

  getAllBills() {
    this.billsServ.getBills().subscribe(
      (data) => {
        this.bills = data;
        this.fillClientForm();
      }
    )
  }

  getClientBills(id: string) {
    this.checkedBills = [];
    Object.keys(this.bills).forEach((i, el) => {
      if (this.bills[i].client.id === id) {
        const bills = this.clientForm.get('bills') as FormArray;
        bills.push(new FormControl(this.bills[i].id));
        this.checkedBills.push(this.bills[i].id);
      }
    });
  }

  returnData() {
    this.clientForm.removeControl('createdAt');
    this.clientForm.removeControl('updatedAt');
    this.returnForm.emit(this.clientForm.value);
  }

  returnCancel() {
    this.exitForm.emit(false);
  }
}
