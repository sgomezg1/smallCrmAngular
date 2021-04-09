import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Bills } from '../../../../interfaces/bills';
import { ItemsService } from '../../../../services/items/items.service';
import { Items } from '../../../../interfaces/items';
import { BillsService } from '../../../../services/bills/bills.service';
@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent implements OnInit {
  @Input('disableFields') disableFields;
  @Input('formData') formData;
  @Input('titleType') titleType; // Can be 1 for add, 2 for preview, 3 for edit
  @Output() returnForm: EventEmitter<any> = new EventEmitter();
  @Output() exitForm: EventEmitter<any> = new EventEmitter();
  bills: Bills[] = [];
  arrItems: Items[] = [];
  itemForm: FormGroup;
  constructor(
    private items: ItemsService,
    private billsService: BillsService
  ) {
    this.itemForm = new FormGroup({
      amount: new FormControl('', Validators.required),
      bill: new FormGroup({
        id: new FormControl()
      }, Validators.required),
      description: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      pricePer: new FormControl(''),
      tax: new FormControl(''),
      totalPrice: new FormControl(''),
    });
  }

  get amountInvalid() {
    return this.itemForm.get('amount').invalid && this.itemForm.get('amount').touched;
  }

  get billInvalid() {
    return this.itemForm.get('bill').invalid && this.itemForm.get('bill').touched;
  }

  get descriptionInvalid() {
    return this.itemForm.get('description').invalid && this.itemForm.get('description').touched;
  }

  get nameInvalid() {
    return this.itemForm.get('name').invalid && this.itemForm.get('name').touched;
  }

  get pricePerInvalid() {
    return this.itemForm.get('pricePer').invalid && this.itemForm.get('pricePer').touched;
  }

  get taxInvalid() {
    return this.itemForm.get('tax').invalid && this.itemForm.get('tax').touched;
  }
  get totalPriceInvalid() {
    return this.itemForm.get('totalPrice').invalid && this.itemForm.get('totalPrice').touched;
  }

  ngOnInit(): void {
    this.disableAllFields();
    this.getBills();
    this.getItems();
    this.fillitemForm();
  }

  fillitemForm() {
    if (this.formData !== undefined || this.formData.length > 0) {
      const dataFromParent = this.formData;
      this.itemForm.get('bill').get('id').patchValue(dataFromParent.bill.id);
      this.itemForm.get('amount').patchValue(dataFromParent.amount);
      this.itemForm.get('description').patchValue(dataFromParent.description);
      this.itemForm.get('name').patchValue(dataFromParent.name);
      this.itemForm.get('pricePer').patchValue(dataFromParent.pricePer);
      this.itemForm.get('tax').patchValue(dataFromParent.tax);
      this.itemForm.get('totalPrice').patchValue(dataFromParent.totalPrice);
    } else {
      this.itemForm.reset();
      this.formData = [];
    }
  }

  disableAllFields() {
    if (this.disableFields == true) {
      this.itemForm.disable();
    }
  }

  getItems() {
    this.arrItems = [];
    this.items.getAllItems().subscribe(
      data => this.arrItems = data
    )
  }

  getBills() {
    this.billsService.getBills().subscribe(
      data => this.bills = data
    )
  }

  returnData() {
    this.returnForm.emit(this.itemForm.value);
  }

  returnCancel() {
    this.exitForm.emit(false);
  }
}
