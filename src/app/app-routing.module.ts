import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './comp/login/login.component';
import {CustomerManagementComponent} from './comp/business/customer-management/customer-management.component'
import {OrderManagementComponent} from './comp/business/order-management/order-management.component'
import {UserManagementComponent} from './comp/business/user-management/user-management.component'
import {EachUserWorkingManagementComponent} from './comp/business/each-user-working-management/each-user-working-management.component'
import {OrderListManagementComponent} from './comp/business/order-list-management/order-list-management.component'
const routes: Routes = [
  { path: 'cis/login', component: LoginComponent },
  { path: 'cis/customer-management', component: CustomerManagementComponent },
  { path: 'cis/order-management/:orderListId', component: OrderManagementComponent },
  { path: 'cis/user-management', component: UserManagementComponent },
  { path: 'cis/each-user-working-management/:workerId', component: EachUserWorkingManagementComponent },
  { path: 'cis/order-list-management/:customerId', component: OrderListManagementComponent },
  { path: '', redirectTo: 'cis/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
