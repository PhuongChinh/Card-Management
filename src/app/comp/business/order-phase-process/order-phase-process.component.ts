import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser'
import { Router, ActivatedRoute } from '@angular/router'
import { HttpConnectorService } from '../../../service/http-connector.service/http-connector.service.component'
import { CONSUME_API } from '../../../service/services/consume-apis';
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-order-phase-process',
  templateUrl: './order-phase-process.component.html',
  styleUrls: ['./order-phase-process.component.css']
})
export class OrderPhaseProcessComponent implements OnInit {

  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private xhr: HttpConnectorService,
    private router: Router
  ) { }

  orderId: string;
  orderName: string;
  currentUserId: string;
  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get("orderId");
    this.getPhaseWorkerOfOrder(this.orderId);
    this.titleService.setTitle("Tiến độ của mẫu");
    this.orderName = sessionStorage.getItem("orderName");
    this.currentUserId = sessionStorage.getItem("userId");
    this.setUpFormAssign();
    this.getAllUser();
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
        'orderId': this.orderId,
        'quantity': this.formAssign.value.quantity,
        'createdId': this.currentUserId,
        'workerId': this.workerId,
        'phase': this.phase

      }
      this.xhr.post(url, body).subscribe((res: any) => {
        if (res) {
          this.formAssign.reset();
          this.getPhaseWorkerOfOrder(this.orderId);
          this.spinner.hide();
        }
      }, (err) => {

      });
    }
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
      'orderId': this.orderId,
      'phaseWorkerId': phaseWorkerId
    }
    url += "?" + this.xhr.buildBodyParam(param);
    this.xhr.get(url).subscribe((res: any) => {
      if (res) {
        console.log(res);
        this.getPhaseWorkerOfOrder(this.orderId);
        this.spinner.hide();
      }
    }, (err) => {
      alert("Xảy ra lỗi, vui lòng F5 lại trang!")
    });
  }

}
