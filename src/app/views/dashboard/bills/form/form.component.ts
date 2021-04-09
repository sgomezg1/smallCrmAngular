import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Bills } from '../../../../interfaces/bills';
import { Clients } from '../../../../interfaces/clients';
import { ClientsService } from '../../../../services/clients/clients.service';
import { formatDate } from '@angular/common' 

@Component({
  selector: 'app-bill-form',
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
  arrClients: Clients[] = [];
  billForm: FormGroup;
  constructor(
    private clients: ClientsService
  ) {
    this.billForm = new FormGroup({
      client: new FormGroup({
        id: new FormControl()
      }, Validators.required),
      date: new FormControl(''),
    });
  }

  get clientIdInvalid() {
    return this.billForm.get('client').invalid && this.billForm.get('client').touched;
  }

  get invalidDate() {
    return this.billForm.get('date').invalid && this.billForm.get('date').touched;
  }

  ngOnInit(): void {
    this.disableAllFields();
    this.getClients();
    this.fillBillForm();
  }

  fillBillForm() {
    if (this.formData !== undefined) {
      const dataFromParent = this.formData;
      this.billForm.get('client').get('id').patchValue(dataFromParent.client.id);
      this.billForm.get('date').patchValue(formatDate(dataFromParent.date, 'yyyy-MM-dd', 'en'));
    } else {
      this.billForm.reset();
      this.formData = [];
    }
  }

  disableAllFields() {
    if (this.disableFields == true) {
      this.billForm.disable();
    }
  }

  getClients() {
    this.arrClients = [];
    this.clients.getClients().subscribe(
      data => this.arrClients = data
    )
  }

  returnData() {
    this.returnForm.emit(this.billForm.value);
  }

  returnCancel() {
    this.exitForm.emit(false);
  }

}
