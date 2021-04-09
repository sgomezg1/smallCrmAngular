import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ItemsService } from '../../../services/items/items.service';
import { Items } from '../../../interfaces/items';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements AfterViewInit, OnDestroy {
  @ViewChild(DataTableDirective) private dtElement;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  arrItems: Items[] = [];
  loading = true;
  showSuccessAlert = false;
  serverMessage: string;

  // Form controls to form child component

  showForm = false; // Shows or not child form
  titleType: number; // Can be 1 for add, 2 for preview, 3 for edit
  dataToForm: Items[] = [];  // Item  data will be sent with this property
  hideTitle = false; // Hide big title of this component
  disableFormFields = false; // Disable fields when user wants to preview a item
  
  constructor(
    private items: ItemsService
  ) { }

  ngAfterViewInit(): void {
    this.dtOptions = {
      pagingType: 'simple',
      pageLength: 10,
      dom: "Bfrtip"
    };
    this.getAllItems();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();  
    });
  }

  openAddForm() {
    this.showForm = false;
    setTimeout(() => this.setChildFormData(true, 1, true, [], false) , 100);
  }

  closeForm() {
    this.showForm = false;
  }

  getAllItems() {
    this.arrItems = [];
    this.items.getAllItems().subscribe(
      (data) => {
        this.arrItems = data;
        setTimeout(() => {
          this.dtTrigger.next();
        }, 100);
        this.loading = false;
      }
    )
  }

  getEditData(id: string, titleType: number) {
    this.showForm = false;
    this.getItemById(id, titleType, false);
  }

  getPreviewData(id: string, titleType: number) {
    this.showForm = false;
    this.getItemById(id, titleType, true);
  }

  getItemById(id: string, titleType: number, disableFormFields: boolean) {
    localStorage.setItem('item_id', id);
    this.items.getItemById(id).subscribe(
      (data) => this.setChildFormData(true, titleType, true, data, disableFormFields)
    )
  }

  sendHttpClientRequest(data) {
    switch(this.titleType) {
      case 1:
        this.createNewItem(data);
        break;
      case 3:
        this.updateItem(data);
        break;
      default:
        break;
    }
  }

  createNewItem(data) {
    this.items.createItem(data).subscribe(
      (data) => {
        this.serverMessage = 'Item created successfully';
        this.reloadTable();
      }
    );
  }

  updateItem(data) {
    const clientId = localStorage.getItem('item_id');
    this.items.updateItem(clientId, data).subscribe(
      (data) => {
        this.serverMessage = 'Item updated successfully';
        this.reloadTable();
        const clientId = localStorage.removeItem('item_id');
      }
    )
  }

  deletItem(id: string) {
    const confirmAction = confirm('¿Are you sure to delete this item?');
    if (confirmAction) {
      this.items.deleteItem(id).subscribe(
        (data) => {
          this.serverMessage = 'Item deleted successfully';
          this.reloadTable();
        }
      )
    }
  }

  setChildFormData(
    showForm: boolean,
    titleType: number,
    hideTitle: boolean,
    formData: Items[],
    disableFormFields: boolean
  ) {
    this.showForm = showForm;
    this.titleType = titleType;
    this.hideTitle = hideTitle;
    this.dataToForm = formData;
    this.disableFormFields = disableFormFields;
  }

  reloadTable(): void {
    const that = this;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      that.showForm = false;
      that.getAllItems();
    });
    this.showSuccessAlert = true;
    setTimeout(() => {
      this.showSuccessAlert = false;
    }, 3000);
  }
}
