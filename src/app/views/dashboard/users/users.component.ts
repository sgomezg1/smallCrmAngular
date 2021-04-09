import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { UsersService } from '../../../services/users/users.service';
import { Users } from '../../../interfaces/users';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements AfterViewInit, OnDestroy {
  @ViewChild(DataTableDirective) private dtElement;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  arrUsers: Users[] = [];
  loading = true;
  showSuccessAlert = false;
  serverMessage: string;

  // Form controls to form child component

  showForm = false; // Shows or not child form
  titleType: number; // Can be 1 for add, 2 for preview, 3 for edit
  dataToForm: Users[] = [];  // Users data will be sent with this property
  hideTitle = false; // Hide big title of this component
  disableFormFields = false; // Disable fields when user wants to preview an user
  
  constructor(
    private users: UsersService
  ) { }

  ngAfterViewInit(): void {
    this.dtOptions = {
      pagingType: 'simple',
      pageLength: 10,
      dom: "Bfrtip"
    };
    this.getAllUsers();
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

  getAllUsers() {
    this.arrUsers = [];
    this.users.getAllUsers().subscribe(
      (data) => {
        this.arrUsers = data;
        setTimeout(() => {
          this.dtTrigger.next();
        }, 100);
        this.loading = false;
      }
    )
  }

  getEditData(id: string, titleType: number) {
    this.showForm = false;
    this.getUserById(id, titleType, false);
  }

  getPreviewData(id: string, titleType: number) {
    this.showForm = false;
    this.getUserById(id, titleType, true);
  }

  getUserById(id: string, titleType: number, disableFormFields: boolean) {
    localStorage.setItem('user_id', id);
    this.users.getUserById(id).subscribe(
      (data) => this.setChildFormData(true, titleType, true, data, disableFormFields)
    )
  }

  sendHttpClientRequest(data) {
    switch(this.titleType) {
      case 1:
        this.createNewUser(data);
        break;
      case 3:
        this.updateUser(data);
        break;
      default:
        break;
    }
  }

  createNewUser(data) {
    this.users.createUser(data).subscribe(
      (data) => {
        this.serverMessage = 'User created successfully';
        this.reloadTable();
      }
    );
  }

  updateUser(data) {
    const clientId = localStorage.getItem('user_id');
    this.users.updateUser(clientId, data).subscribe(
      (data) => {
        this.serverMessage = 'User updated successfully';
        this.reloadTable();
        const clientId = localStorage.removeItem('user_id');
      }
    )
  }

  deletItem(id: string) {
    const confirmAction = confirm('¿Are you sure to delete this user?');
    if (confirmAction) {
      this.users.deleteUser(id).subscribe(
        (data) => {
          this.serverMessage = 'User deleted successfully';
          this.reloadTable();
        }
      )
    }
  }

  setChildFormData(
    showForm: boolean,
    titleType: number,
    hideTitle: boolean,
    formData: Users[],
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
      that.getAllUsers();
    });
    this.showSuccessAlert = true;
    setTimeout(() => {
      this.showSuccessAlert = false;
    }, 3000);
  }
}
