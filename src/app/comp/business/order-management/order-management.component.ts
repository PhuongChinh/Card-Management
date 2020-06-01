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
    this.titleService.setTitle("Quản lí mẫu");
    this.checkIfAdmin();
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
    this.setUpFormAssign();
    this.getAllUser();
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
      price: new FormControl('', [])
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
      'orderListId': this.orderListId
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

  lstUser: any = [];
  lstMaxNumber: any = [];
  workerId: string = "";
  getAllUser() {
    this.spinner.show();
    let url = CONSUME_API.USERS.USERS;
    this.xhr.get(url).subscribe((res: any) => {
      if (res) {
        this.lstUser = res._embedded.users;
        this.spinner.hide();
      }
    }, (err) => {

    });
  }

  selectOptionUser(evt: any) {
    this.workerId = evt;
  }

  formAssign: FormGroup;
  setUpFormAssign() {
    this.formAssign = new FormGroup({
      quantity: new FormControl('', [])
    })
  }

  phase: string;
  maxCard: number;
  setPhase(phase: string, notDo: number) {
    this.phase = phase;
    this.maxCard = notDo;
  }
  assignJob() {
    if (this.formAssign.value.quantity > this.maxCard) {
      alert("Số lượng thiệp được giao lớn hơn số lượng còn lại của bước này!!!")
    } else {
      this.spinner.show();
      let url = CONSUME_API.ORDER.ASSIGN_JOB;
      let body = {
        'orderId': this.orderDetailId,
        'quantity': this.formAssign.value.quantity,
        'createdId': this.currentUserId,
        'workerId': this.workerId,
        'phase': this.phase

      }
      this.xhr.post(url, body).subscribe((res: any) => {
        if (res) {
          this.formAssign.reset();
          this.getPhaseWorkerOfOrder(this.orderDetailId);
          this.spinner.hide();
        }
      }, (err) => {

      });
    }
  }

  orderDetailId: string;
  orderDetail: any;
  seeProgess(order: any) {
    this.isSeeProcess = true;
    this.orderDetailId = order.id;
    this.orderDetail = order;
    this.getPhaseWorkerOfOrder(this.orderDetailId);
  }


  progessDetail: any;
  getPhaseWorkerOfOrder(orderId: string) {
    this.spinner.show();
    let url = CONSUME_API.ORDER.PHASE_WORKER_OF_ORDER;
    let param = {
      'orderId': orderId
    }
    url += "?" + this.xhr.buildBodyParam(param);
    this.xhr.get(url).subscribe((res: any) => {
      if (res) {
        console.log(res);
        this.progessDetail = res.result;
        if (this.isSeeAllOrder) {
          this.getAllOrder();
        } else {
          this.getOrderByOrderListId(this.orderListId);
        }
        this.spinner.hide();
      }
    }, (err) => {
      alert("Xảy ra lỗi, vui lòng F5 lại trang!")
    });
  }

  // Xác nhận làm xong việc
  confirmCompletedJob(phaseWorkerId: string) {
    this.spinner.show();
    let url = CONSUME_API.ORDER.CONFIRM_COMPLETED_JOB;
    let param = {
      'orderId': this.orderDetailId,
      'phaseWorkerId': phaseWorkerId
    }
    url += "?" + this.xhr.buildBodyParam(param);
    this.xhr.get(url).subscribe((res: any) => {
      if (res) {
        console.log(res);
        this.getPhaseWorkerOfOrder(this.orderDetailId);
        this.spinner.hide();
      }
    }, (err) => {
      alert("Xảy ra lỗi, vui lòng F5 lại trang!")
    });
  }
  checkIfAdmin() {
    let role = sessionStorage.getItem("role");
    if (role === "WORKER" || role === null) {
      sessionStorage.clear();
      this.router.navigate(['/cis/login']);
    }
  }

}
