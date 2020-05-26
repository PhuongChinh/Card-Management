import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser'
import { Router, ActivatedRoute } from '@angular/router'
import { HttpConnectorService } from '../../../service/http-connector.service/http-connector.service.component'
import { CONSUME_API } from '../../../service/services/consume-apis';
import { FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.css']
})
export class OrderManagementComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private xhr: HttpConnectorService
  ) { }

  customerName: string;
  customerId: string;
  ngOnInit(): void {
    this.customerName = sessionStorage.getItem("customerName");
    this.customerId = this.route.snapshot.paramMap.get("customerId");
    this.setupForm();
    this.getOrderByCustomerId();
  }

  lstOrder: any = [];
  formCreateOrder : FormGroup;
  setupForm() {
    this.formCreateOrder = new FormGroup({
      name: new FormControl('', []),
      desc: new FormControl('', []),
      note: new FormControl('', []),
      quantity: new FormControl('', []),
      price: new FormControl('', [])
    })
  }

  getOrderByCustomerId(){
    let url = CONSUME_API.ORDER.GET_ORDER_BY_CUSTOMER_ID;
    let param = {
      'customerId': this.customerId
    }
    url += "?" + this.xhr.buildBodyParam(param);
    this.xhr.get(url).subscribe((res: any) => {
      if (res) {
        this.lstOrder = res.result;
      }
    }, (err) => {

    });
  }
  createOrder() {
    let url = CONSUME_API.ORDER.CREATE_ORDER;
    let body = {
      'orderId':'',
      'orderName': this.formCreateOrder.value.name,
      'orderDesc': this.formCreateOrder.value.desc,
      'orderNote': this.formCreateOrder.value.note,
      'orderQuantity': +this.formCreateOrder.value.quantity,
      'orderPrice': +this.formCreateOrder.value.price,
      'customerId': this.customerId
    }
    this.xhr.post(url,body).subscribe((res: any) => {
      if (res) {
        this.lstOrder = res.result;
      }
    }, (err) => {

    });
  }

}
