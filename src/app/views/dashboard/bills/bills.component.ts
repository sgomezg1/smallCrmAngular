import { Component, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { BillsService } from '../../../services/bills/bills.service';
import { Bills } from '../../../interfaces/bills';
import { Items } from '../../../interfaces/items';
import { ClientsService } from '../../../services/clients/clients.service';
import { Clients } from '../../../interfaces/clients';
import { TokenService } from '../../../services/token/token.service';
import { UsersService } from '../../../services/users/users.service';
import { Users } from '../../../interfaces/users';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss']
})
export class BillsComponent implements AfterViewInit, OnDestroy {
  @ViewChild(DataTableDirective) private dtElement;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  arrBills: Bills[] = [];
  loading = true;
  showSuccessAlert = false;
  showErrorAlert = false;
  serverMessage: string;

  // Form controls to form child component

  showForm = false; // Shows or not child form
  titleType: number; // Can be 1 for add, 2 for preview, 3 for edit
  dataToForm: Bills[] = [];  // Bill  data will be sent with this property
  hideTitle = false; // Hide big title of this component
  disableFormFields = false; // Disable fields when user wants to preview a bill
  billDataPdf: Bills[] = [];
  itemsByBillPdf: Items[] = [];
  clientDataPdf: Clients[] = [];
  currentUserData: any[] = [];
  usersArray: Users[] = [];
  userDataPdf: any = [];
  totalPerPricePdf = 0;
  totalPricesPdf = 0;
  emailToSend = '';

  constructor(
    private bills: BillsService,
    private clients: ClientsService,
    private token: TokenService,
    private users: UsersService,
  ) { }

  ngAfterViewInit(): void {
    this.getCurrentUserData();
    this.dtOptions = {
      pagingType: 'simple',
      pageLength: 10,
      dom: "Bfrtip"
    };
    this.getAllBills();
  }

  openAddForm() {
    this.showForm = false;
    setTimeout(() => this.setChildFormData(true, 1, true, [], false) , 100);
  }

  closeForm() {
    this.showForm = false;
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();  
    });
  }

  getAllBills() {
    this.arrBills = [];
    this.bills.getBills().subscribe(
      (data) => {
        this.arrBills = data;
        setTimeout(() => this.dtTrigger.next(), 100);
        this.loading = false;
      }
    )
  }

  getEditData(id: string, titleType: number) {
    this.showForm = false;
    this.getBillById(id, titleType, false);
  }

  getPreviewData(id: string, titleType: number) {
    this.showForm = false;
    this.getBillById(id, titleType, true);
  }

  getBillById(id: string, titleType: number, disableFormFields: boolean) {
    localStorage.setItem('bill_id', id);
    this.bills.getBillById(id).subscribe(
      (data) => this.setChildFormData(true, titleType, true, data, disableFormFields)
    )
  }

  sendHttpClientRequest(data) {
    switch(this.titleType) {
      case 1:
        this.createNewBill(data);
        break;
      case 3:
        this.updateBill(data);
        break;
      default:
        break;
    }
  }

  createNewBill(data) {
    this.bills.addBill(data).subscribe(
      (data) => {
        this.serverMessage = 'Bill created successfully';
        this.reloadTable();
      }
    );
  }

  updateBill(data) {
    const clientId = localStorage.getItem('bill_id');
    this.bills.updateBillById(clientId, data).subscribe(
      (data) => {
        this.serverMessage = 'Bill updated successfully';
        this.reloadTable();
        const clientId = localStorage.removeItem('bill_id');
      }
    )
  }

  deleteBill(id: string) {
    const confirmAction = confirm('¿Are you sure to delete this bill?');
    if (confirmAction) {
      this.bills.deleteBillById(id).subscribe(
        (data) => {
          this.serverMessage = 'Bill deleted successfully';
          this.reloadTable();
        }
      )
    }
  }

  setChildFormData(
    showForm: boolean,
    titleType: number,
    hideTitle: boolean,
    formData: Bills[],
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
      that.getAllBills();
    });
    this.showSuccessAlert = true;
    setTimeout(() => this.showSuccessAlert = false, 3000);
  }

  generatePdf(id: string, clientId: string, mailOrDownload: number) {
    // mailOrDownload: 1 = download, 2 = send mail
    this.billDataPdf = [];
    this.itemsByBillPdf = [];
    this.clientDataPdf = [];
    this.currentUserData = [];
    this.usersArray = [];
    this.userDataPdf  = [];
    this.totalPerPricePdf = 0;
    this.totalPricesPdf = 0;
    this.bills.getBillById(id).subscribe(
      (data) => {
        this.billDataPdf = data;
        this.getItemsByBill(id, clientId, mailOrDownload);
      }
    )
  }

  getItemsByBill(billId: string, clientId: string, mailOrDownload: number) {
    this.bills.getItemsByBill(billId).subscribe(
      data => {
        if (data.length > 0) {
          this.itemsByBillPdf = data;
          this.getClientData(clientId, mailOrDownload);
        } else {
          this.showErrorAlert = true;
          this.serverMessage = 'This client hasn´t items in his bill';
          setTimeout(() => this.showErrorAlert = false, 3000);
        }
      }
    )
  }
    
  getClientData(clientId: string, mailOrDownload: number) {
    this.clients.getClientById(clientId).subscribe(
      (data: any) => {
        this.clientDataPdf = data;
        this.emailToSend = data.email;
        this.getCurrentUserData();
        this.getSumTotals();
        this.createPdf(mailOrDownload);
      }
    )
  }

  getCurrentUserData() {
    this.users.getAllUsers().subscribe(
      (data: any) => {
        this.usersArray = data;
        const usuData = JSON.parse(atob(this.token.get()));
        const username = usuData.username;
        Object.keys(this.usersArray).forEach((i, el) => {
          if (this.usersArray[el].username ===  username) {
            this.userDataPdf = this.usersArray[i];
            return false;
          }
        });
      }
    )
  }

  getSumTotals() {
    this.totalPricesPdf, this.totalPerPricePdf  = 0;
    Object.keys(this.itemsByBillPdf).forEach((i, el) => {
      const currentTotalPrice: number = this.itemsByBillPdf[i].amount * this.itemsByBillPdf[i].pricePer;
      this.totalPricesPdf = this.totalPricesPdf + currentTotalPrice;
      this.totalPerPricePdf = this.totalPerPricePdf + this.itemsByBillPdf[i].pricePer;
    });
  }

  createPdf(mailOrDownload: number) {
    this.showSuccessAlert = true;
    this.serverMessage = 'Please wait, we are processing your request...';
    const formData = {
      userData: this.userDataPdf,
      clientData: this.clientDataPdf,
      billData: this.billDataPdf,
      billItems: this.itemsByBillPdf,
      totalPerPrice: this.totalPerPricePdf,
      totalPrices: this.totalPricesPdf,
      email: ''
    }
    if (mailOrDownload == 1) {
      this.bills.generatePdf(formData).subscribe(
        (data: any) => {
          this.downloadFile(data);
        }
      )
    } else if (mailOrDownload == 2) {
      formData.email = this.emailToSend;
      this.bills.sendEmailPdf(formData).subscribe(
        (data: any) => {
          this.serverMessage = data;
          setTimeout(() => this.showSuccessAlert = false, 3000);
        }
      )
    }
  }

  private downloadFile(data){
    let blob = new Blob([data], { type: 'application/pdf' });
    let url = window.URL.createObjectURL(blob);
    let link = document.createElement('a');
    link.href = url;
    const date = new Date();
    link.download = `bill_${date.getTime()}.pdf`;
    link.dispatchEvent(new MouseEvent('click'));
    this.serverMessage = 'PDF generated and downloaded successfully';
    setTimeout(() => this.showSuccessAlert = false, 3000);
  }
}