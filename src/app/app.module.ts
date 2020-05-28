import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './comp/login/login.component';
import { CustomerManagementComponent } from './comp/business/customer-management/customer-management.component';
import { OrderManagementComponent } from './comp/business/order-management/order-management.component';
import { UserManagementComponent } from './comp/business/user-management/user-management.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule, MatToolbarRow } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { EachUserWorkingManagementComponent } from './comp/business/each-user-working-management/each-user-working-management.component';
import { HeaderWebComponent } from './comp/business/header-web/header-web.component';
import { MobileHeaderComponent } from './comp/business/mobile-header/mobile-header.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CustomerManagementComponent,
    OrderManagementComponent,
    UserManagementComponent,
    EachUserWorkingManagementComponent,
    HeaderWebComponent,
    MobileHeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatTableModule,
    MatButtonModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
