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

  currentPage: number = 0;
  ngOnInit(): void {
    this.checkIfAdmin();
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
      phone: new FormControl('', []),
      address: new FormControl('', [])
    })
  }
  getAllCustomer(){
    this.spinner.show();
    let url = CONSUME_API.CUSTOMER.GET_ALL_CUSTOMER;
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
      'customerAddress': this.formCustomer.value.address,
      'isOrder': false,
      'isRequiredDesign': false,
      'orderListQuantity': 0
    }
    this.xhr.post(url, body).subscribe((res: any) => {
      if (res) {
        this.getAllCustomer();
        this.spinner.hide();
      }
    }, (err) => {

    });
  }

  editCustomerId: string;
  setCustomer(id: string){
    this.editCustomerId = id;
  }
  deleteCustomer(){
    let url = CONSUME_API.CUSTOMER.CUSTOMERS + "/" + this.editCustomerId;
    this.xhr.delete(url).subscribe((res: any) => {
        this.getAllCustomer();
    }, (err) => {

    });
  }

  viewOrder(name: string, id: string){
   sessionStorage.setItem("customerName",name);
   this.router.navigate(['/cis/order-list-management', id]);
  }
  checkIfAdmin(){
    let role = sessionStorage.getItem("role");
    if (role === "WORKER" || role === null){
      sessionStorage.clear();
      this.router.navigate(['/cis/login']);
    }
  }



  editedCustomerId: string;
  isEdited: boolean = false;
  setCreateNew() {
    this.isEdited = false;
    this.formCustomer.reset();
  }
  editCustomer(){
    this.spinner.show();
    let url = CONSUME_API.CUSTOMER.CUSTOMERS + '/' + this.editCustomerId;
    let body = {
      'customerName': this.formCustomer.value.name,
      'note': this.formCustomer.value.note,
      'phone': this.formCustomer.value.phone,
      'email': this.formCustomer.value.email,
      'customerAddress': this.formCustomer.value.address,
    }
    this.xhr.patch(url, body).subscribe((res: any) => {
      if (res) {
        this.getAllCustomer();
        this.spinner.hide();
      }
    }, (err) => {

    });
  }

  setEditedCustomer(customer: any){
    this.isEdited  = true;
    this.editCustomerId = customer.id;
    this.formCustomer.setValue({
      name: customer.customerName,
      note: customer.note,
      email: customer.email,
      phone: customer.phone,
      address: customer.customerAddress
    })
  }



}
