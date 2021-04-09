import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { Error401Component } from './views/error/error401/error401.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { AfterLoginGuard } from './guards/after-login.guard';
import { BeforeLoginGuard } from './guards/before-login.guard';



export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '401',
    component: Error401Component,
    data: {
      title: 'Unauthorized'
    }
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Not Found'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Oops, we have an error'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    },
    canActivate: [BeforeLoginGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    },
    canActivate: [BeforeLoginGuard]
  },
  {
    path: 'app',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      }
    ],
    canActivate: [AfterLoginGuard]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
