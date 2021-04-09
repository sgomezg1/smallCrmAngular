import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ClientsComponent } from './clients/clients.component';
import { BillsComponent } from './bills/bills.component';
import { UsersComponent } from './users/users.component';
import { ItemsComponent } from './items/items.component';
import { DataTablesModule } from 'angular-datatables';
import { LoadingComponent } from './loading/loading.component';
import { FormComponent } from './clients/form/form.component';
import { FormComponent as billFormComponent } from './bills/form/form.component';
import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';
import { ItemFormComponent } from './items/item-form/item-form.component';
import { UsersFormComponent } from './users/users-form/users-form.component';
import { BillPdfComponent } from './bills/bill-pdf/bill-pdf.component';

@NgModule({
  imports: [
    FormsModule,
    DashboardRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    DataTablesModule.forRoot(),
    CommonModule
  ],
  declarations: [
    DashboardComponent,
    ClientsComponent,
    BillsComponent,
    UsersComponent,
    ItemsComponent,
    LoadingComponent,
    FormComponent,
    HomeDashboardComponent,
    billFormComponent,
    ItemFormComponent,
    UsersFormComponent,
    BillPdfComponent
  ]
})
export class DashboardModule { }
