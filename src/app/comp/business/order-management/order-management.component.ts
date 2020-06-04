import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser'
import { Router, ActivatedRoute } from '@angular/router'
import { HttpConnectorService } from '../../../service/http-connector.service/http-connector.service.component'
import { CONSUME_API } from '../../../service/services/consume-apis';
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.css']
})
export class OrderManagementComponent implements OnInit {

  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private xhr: HttpConnectorService,
    private router: Router
  ) { }

  orderListName: string;
  orderListId: string;
  currentUserId: string;
  isSeeProcess: boolean = false;
  isSeeAllOrder: boolean = false;
  numberOfOrder: number = 0;
  currentPage: number = 0;
  ngOnInit(): void {
    this.checkIfAdmin();
    this.titleService.setTitle("Quản lí mẫu");
    this.orderListId = this.route.snapshot.paramMap.get("orderListId");
    if (this.orderListId === "all") {
      this.getAllOrder();
      this.isSeeAllOrder = true;
    } else {
      this.isSeeAllOrder = false;
      this.orderListName = sessionStorage.getItem("orderListName");
      this.getOrderByOrderListId(this.orderListId);
    }
    this.setupForm();
    this.currentUserId = sessionStorage.getItem("userId");
  }

  lstOrder: any = [];
  formCreateOrder: FormGroup;
  setupForm() {
    this.formCreateOrder = new FormGroup({
      name: new FormControl('', []),
      desc: new FormControl('', []),
      note: new FormControl('', []),
      quantity: new FormControl('', []),
      price: new FormControl('', []),
      imageLink: new FormControl('',[])
    })
  }

  getOrderByOrderListId(orderListId: any) {
    this.spinner.show();
    let url = CONSUME_API.ORDER.GET_ORDER_BY_ORDER_LIST_ID;
    let param = {
      'orderListId': orderListId
    }
    url += "?" + this.xhr.buildBodyParam(param);
    this.xhr.get(url).subscribe((res: any) => {
      if (res) {
        this.lstOrder = res.result;
        this.numberOfOrder = this.lstOrder.length;
        this.spinner.hide();
      }
    }, (err) => {

    });
  }

  getAllOrder() {
    this.spinner.show();
    let url = CONSUME_API.ORDER.GET_ALL_ORDER;
    this.xhr.get(url).subscribe((res: any) => {
      if (res) {
        this.lstOrder = res.result;
        this.numberOfOrder = this.lstOrder.length;
        this.spinner.hide();
      }
    }, (err) => {

    });
  }

  createOrder() {
    this.spinner.show();
    let url = CONSUME_API.ORDER.CREATE_ORDER;
    let body = {
      'orderId': '',
      'orderName': this.formCreateOrder.value.name,
      'orderDesc': this.formCreateOrder.value.desc,
      'orderNote': this.formCreateOrder.value.note,
      'orderQuantity': +this.formCreateOrder.value.quantity,
      'orderPrice': +this.formCreateOrder.value.price,
      'orderListId': this.orderListId,
      'imageLink': this.formCreateOrder.value.imageLink
    }
    this.xhr.post(url, body).subscribe((res: any) => {
      if (res) {
        if (this.isSeeAllOrder) {
          this.getAllOrder();
        } else {
          this.getOrderByOrderListId(this.orderListId);
        }
        this.formCreateOrder.reset();
        this.spinner.hide();
      }
    }, (err) => {

    });
  }

  viewProcess(name: string, id: string) {
    sessionStorage.setItem("orderName", name);
    this.router.navigate(['/cis/order-phase-process-management', id]);
  }


  editOrderId: string;
  setOrder(id: string){
    this.editOrderId = id;
  }
  deleteOrder(){
    let url = CONSUME_API.ORDER.DELETE_ORDER;
    let param = {
      'orderId': this.editOrderId,
      'orderListId': this.orderListId
    }
    url += "?" + this.xhr.buildBodyParam(param);
    this.xhr.delete(url).subscribe((res: any) => {
      if (this.isSeeAllOrder) {
        this.getAllOrder();
      } else {
        this.getOrderByOrderListId(this.orderListId);
      }
      }, (err) => {

    });
  }
  isManager: boolean = false;
  checkIfAdmin() {
    let role = sessionStorage.getItem("role");
    if (role === "ADMIN") {
      this.isManager = true;
    }
  }

  imageLink: string;
  setInfo(order: any) {
    this.imageLink = order.imageLink;
  }

  startManufactory(id: string){
    let url = CONSUME_API.ORDER.START_PROGESS;
    let param = {
      'orderId': id
    }
    url += "?" + this.xhr.buildBodyParam(param);
    this.xhr.get(url).subscribe((res: any) => {
      if (this.isSeeAllOrder) {
        this.getAllOrder();
      } else {
        this.getOrderByOrderListId(this.orderListId);
      }
      }, (err) => {

    });
  }

  //UPDATE ORDER
  isEdited: boolean = false;
  setCreateNew() {
    this.isEdited = false;
    this.formCreateOrder.reset();
  }

  setEdited(order: any){
    this.isEdited = true;
    this.editOrderId = order.id
    this.formCreateOrder.setValue({
      name: order.orderName,
      desc: order.orderDesc,
      note: order.note,
      quantity: order.quantity,
      price: order.price,
      imageLink: order.imageLink
    })
  }

  updateOrder(){
    this.spinner.show();
    let url = CONSUME_API.ORDER.ORDERS + "/" + this.editOrderId;
    let body = {
      'orderName': this.formCreateOrder.value.name,
      'orderDesc': this.formCreateOrder.value.desc,
      'note': this.formCreateOrder.value.note,
      'price': +this.formCreateOrder.value.price,
      'imageLink': this.formCreateOrder.value.imageLink
    }
    this.xhr.patch(url, body).subscribe((res: any) => {
      if (res) {
        if (this.isSeeAllOrder) {
          this.getAllOrder();
        } else {
          this.getOrderByOrderListId(this.orderListId);
        }
        this.setCreateNew();
        this.spinner.hide();
      }
    }, (err) => {

    });
  }
}
