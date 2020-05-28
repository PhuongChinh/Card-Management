import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './comp/login/login.component';
import {CustomerManagementComponent} from './comp/business/customer-management/customer-management.component'
import {OrderManagementComponent} from './comp/business/order-management/order-management.component'
import {UserManagementComponent} from './comp/business/user-management/user-management.component'
import {EachUserWorkingManagementComponent} from './comp/business/each-user-working-management/each-user-working-management.component'

const routes: Routes = [
  { path: 'cis/login', component: LoginComponent },
  { path: 'cis/customer-management', component: CustomerManagementComponent },
  { path: 'cis/order-management/:customerId', component: OrderManagementComponent },
  { path: 'cis/user-management', component: UserManagementComponent },
  { path: 'cis/each-user-working-management/:workerId', component: EachUserWorkingManagementComponent },
  { path: '', redirectTo: 'cis/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
