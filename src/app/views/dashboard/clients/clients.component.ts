import { Component, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { Clients } from '../../../interfaces/clients';
import { ClientsService } from '../../../services/clients/clients.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements AfterViewInit, OnDestroy {
  @ViewChild(DataTableDirective) private dtElement;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  arrClientes: Clients[] = [];
  loading = true;
  showSuccessAlert = false;
  serverMessage: string;

  // Form controls to form child component

  showForm = false; // Shows or not child form
  titleType: number; // Can be 1 for add, 2 for preview, 3 for edit
  dataToForm: Clients[] = [];  // Client  data will be sent with this property
  hideTitle = false; // Hide big title of this component
  disableFormFields = false; // Disable fields when user wants to preview a client
  constructor(
    private clients: ClientsService
  ) { }

  ngAfterViewInit(): void {
    this.dtOptions = {
      pagingType: 'simple',
      pageLength: 10,
      dom: "Bfrtip"
    };
    this.getAllClients();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();  
    });
  }

  getAllClients() {
    this.arrClientes = [];
    this.clients.getClients().subscribe(
      (data) => {
        this.arrClientes = data;
        setTimeout(() => {
          this.dtTrigger.next();
        }, 100);
        this.loading = false;
      }
    )
  }

  getEditData(id: string, titleType: number) {
    this.showForm = false;
    this.getClientById(id, titleType, false);
  }

  getPreviewData(id: string, titleType: number) {
    this.showForm = false;
    this.getClientById(id, titleType, true);
  }

  getClientById(id: string, titleType: number, disableFormFields: boolean) {
    this.clients.getClientById(id).subscribe(
      (data) => this.setChildFormData(true, titleType, true, data, disableFormFields)
    )
  }

  setChildFormData(
    showForm: boolean,
    titleType: number,
    hideTitle: boolean,
    formData: Clients[],
    disableFormFields: boolean
  ) {
    this.showForm = showForm;
    this.titleType = titleType;
    this.hideTitle = hideTitle;
    this.dataToForm = formData;
    this.disableFormFields = disableFormFields;
  }

  openAddForm() {
    this.showForm = false;
    setTimeout(() => this.setChildFormData(true, 1, true, [], false) , 100);
  }

  closeForm() {
    this.showForm = false;
  }

  sendHttpClientRequest(data) {
    switch(this.titleType) {
      case 1:
        this.createNewClient(data);
        break;
        case 3:
        this.updateClient(data);
        break;
      default:
        break;
    }
  }

  createNewClient(data) {
    delete data.id;
    this.clients.addClient(data).subscribe(
      (data) => {
        this.serverMessage = 'Client created successfully';
        this.reloadTable();
      }
    );
  }

  updateClient(data) {
    const clientId = data.id;
    delete data.id;
    this.clients.updateClient(clientId, data).subscribe(
      (data) => {
        this.serverMessage = 'Client updated successfully';
        this.reloadTable();
      }
    )
  }

  deleteClient(id: string) {
    const confirmAction = confirm('¿Are you sure to delete this client?');
    if (confirmAction) {
      this.clients.deleteClient(id).subscribe(
        (data) => {
          this.serverMessage = 'Client deleted successfully';
          this.reloadTable();
        }
      )
    }
  }

  reloadTable(): void {
    const that = this;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      that.showForm = false;
      that.getAllClients();
    });
    this.showSuccessAlert = true;
    setTimeout(() => {
      this.showSuccessAlert = false;
    }, 3000);
  }

}
