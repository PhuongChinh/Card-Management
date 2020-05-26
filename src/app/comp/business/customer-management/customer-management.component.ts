import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser'
import {Router} from '@angular/router'
import { HttpConnectorService } from '../../../service/http-connector.service/http-connector.service.component'
import { CONSUME_API } from '../../../service/services/consume-apis';
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";

//import { ToastrService } from 'ngx-toastr';
import {STATUS_RESP} from '../../../constants'
@Component({
  selector: 'app-customer-management',
  templateUrl: './customer-management.component.html',
  styleUrls: ['./customer-management.component.css']
})
export class CustomerManagementComponent implements OnInit {

  constructor(
    private title: Title,
    private xhr: HttpConnectorService,
    //private toarst: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {
    this.title.setTitle("Quản lí khách hàng");
   }

  ngOnInit(): void {
    this.getAllCustomer();
    this.setupForm();
  }

  lstCustomer: any = [];
  formCustomer: FormGroup;

  setupForm(){
    this.formCustomer = new FormGroup({
      name: new FormControl('', []),
      note: new FormControl('', []),
      email: new FormControl('', []),
      phone: new FormControl('', [])
    })
  }
  getAllCustomer(){
    this.spinner.show();
    let url = CONSUME_API.CUSTOMER.CUSTOMERS;
    this.xhr.get(url).subscribe((res: any) => {
      if (res) {
        this.lstCustomer = res._embedded.customers;
        this.spinner.hide();
      }
    }, (err) => {

    });
  }

  createOrUpdateCustomer(){
    this.spinner.show();
    let url = CONSUME_API.CUSTOMER.CUSTOMERS;
    let body = {
      'customerName': this.formCustomer.value.name,
      'note': this.formCustomer.value.note,
      'phone': this.formCustomer.value.phone,
      'email': this.formCustomer.value.email,
    }
    this.xhr.post(url, body).subscribe((res: any) => {
      if (res) {
        this.getAllCustomer();
        this.spinner.hide();
      }
    }, (err) => {

    });
  }

  deleteCustomer(id: string){
    let url = CONSUME_API.CUSTOMER.CUSTOMERS + "/" + id;
    this.xhr.delete(url).subscribe((res: any) => {
        this.getAllCustomer();
    }, (err) => {

    });
  }

  viewOrder(name: string, id: string){
   sessionStorage.setItem("customerName",name);
   this.router.navigate(['/cis/order-management', id]);
  }
}
