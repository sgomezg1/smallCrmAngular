import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { P404Component } from '../error/404.component';
import { BillsComponent } from './bills/bills.component';
import { ClientsComponent } from './clients/clients.component';

import { ItemsComponent } from './items/items.component';
import { UsersComponent } from './users/users.component';
import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: HomeDashboardComponent,
    data: {
      title: 'Dashboard'
    }
  },
  {
    path: 'bills',
    component: BillsComponent,
    data: {
      title: 'Bills'
    }
  },
  {
    path: 'clients',
    component: ClientsComponent,
    data: {
      title: 'Clients'
    }
  },
  {
    path: 'items',
    component: ItemsComponent,
    data: {
      title: 'Items'
    }
  },
  {
    path: 'users',
    component: UsersComponent,
    data: {
      title: 'Users'
    }
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
