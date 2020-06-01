import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser'
import {Router, ActivatedRoute} from '@angular/router'
import { HttpConnectorService } from '../../../service/http-connector.service/http-connector.service.component'
import { CONSUME_API } from '../../../service/services/consume-apis';
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-order-list-management',
  templateUrl: './order-list-management.component.html',
  styleUrls: ['./order-list-management.component.css']
})
export class OrderListManagementComponent implements OnInit {

  constructor(
    private title: Title,
    private xhr: HttpConnectorService,
    //private toarst: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  isSeeAllOrderList: boolean = false;
  customerId: string;
  customerName: string;
  lstOrderList: any = [];
  currentPage: number = 0;
  ngOnInit(): void {
    this.title.setTitle("Quản lí đơn hàng");
    this.setupForm();
    this.customerId = this.route.snapshot.paramMap.get("customerId");
    if (this.customerId === "all") {
      this.getAllOrderList();
      this.isSeeAllOrderList = true;
    } else {
      this.isSeeAllOrderList = false;
      this.customerName = sessionStorage.getItem("customerName");
      this.getOrderListByCustomerId(this.customerId);
    }
  }

  getOrderListByCustomerId(customerId: string){
    this.spinner.show();
    let url = CONSUME_API.ORDER_LIST.GET_ORDER_LIST_BY_CUSTOMER_ID;
    let param = {
      'customerId': customerId
    }
    url += "?" + this.xhr.buildBodyParam(param);
    this.xhr.get(url).subscribe((res: any) => {
      if (res) {
        this.lstOrderList = res._embedded.orderLists;
        this.spinner.hide();
      }
    }, (err) => {

    });
}
  getAllOrderList(){
    this.spinner.show();
    let url = CONSUME_API.ORDER_LIST.GET_ALL_ORDER_LIST;
    this.xhr.get(url).subscribe((res: any) => {
      if (res) {
        this.lstOrderList = res._embedded.orderLists;
        this.spinner.hide();
      }
    }, (err) => {

    });
  }

  //CREATE ORDER LIST
  formCreateOrderList: FormGroup;
  setupForm() {
    this.formCreateOrderList = new FormGroup({
      name: new FormControl('', []),
      desc: new FormControl('', []),
      note: new FormControl('', [])
    })
  }

  createOrderList() {
    this.spinner.show();
    let url = CONSUME_API.ORDER_LIST.CREATE_ORDER_LITS;
    let body = {
      'orderListName': this.formCreateOrderList.value.name,
      'orderListDesc': this.formCreateOrderList.value.desc,
      'orderListNote': this.formCreateOrderList.value.note,
      'customerId': this.customerId
    }
    this.xhr.post(url, body).subscribe((res: any) => {
      if (res) {
        if (this.isSeeAllOrderList) {
          this.getAllOrderList();
        } else {
          this.getOrderListByCustomerId(this.customerId);
        }
        console.log("ORDER_LIST: ", this.lstOrderList);
        this.formCreateOrderList.reset();
        this.spinner.hide();
      }
    }, (err) => {

    });
  }

  //DELETE
  editOrderListId: string;
  setOrderList(id: string){
    this.editOrderListId = id;
  }
  deleteOrderList(){
    let url = CONSUME_API.ORDER_LIST.ORDER_LISTS + "/" + this.editOrderListId;
    this.xhr.delete(url).subscribe((res: any) => {
      if (this.isSeeAllOrderList) {
        this.getAllOrderList();
      } else {
        this.getOrderListByCustomerId(this.customerId);
      }
      }, (err) => {

    });
  }

  viewOrder(name: string, id: string){
    sessionStorage.setItem("orderListName",name);
    this.router.navigate(['/cis/order-management', id]);
   }
}
