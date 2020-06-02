import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser'
import { Router, ActivatedRoute } from '@angular/router'
import { HttpConnectorService } from '../../../service/http-connector.service/http-connector.service.component'
import { CONSUME_API } from '../../../service/services/consume-apis';
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-each-user-working-management',
  templateUrl: './each-user-working-management.component.html',
  styleUrls: ['./each-user-working-management.component.css']
})
export class EachUserWorkingManagementComponent implements OnInit {

  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private xhr: HttpConnectorService
  ) { }
  workerId: string;
  currentPage: number = 0;
  ngOnInit(): void {
    this.setUpFormNoteWorker();
    this.setUpFormNoteManager();
    this.checkIfAdmin();
    this.titleService.setTitle("Quản lí công việc");
    this.workerId = this.route.snapshot.paramMap.get("workerId");
    this.getWorkerPhaseByWorkerId();
  }

  lstWorkerPhase: any = [];
  getWorkerPhaseByWorkerId(){
    this.spinner.show();
    let url = CONSUME_API.ORDER.GET_EACH_USER_WORKING;
    let param = {
      'workerId': this.workerId
    }
    url += "?" + this.xhr.buildBodyParam(param);
    this.xhr.get(url).subscribe((res: any) => {
      if (res) {
        this.lstWorkerPhase = res.result;
        console.log(this.lstWorkerPhase);
        this.spinner.hide();
      }
    }, (err) => {

    });
  }

  confirmCompletedJob(){
    this.spinner.show();
    let url = CONSUME_API.ORDER.CONFIRM_COMPLETED_JOB;
    let param = {
      'orderId': this.orderId,
      'phaseWorkerId': this.phaseWorkerId
    }
    url += "?" + this.xhr.buildBodyParam(param);
    this.xhr.get(url).subscribe((res: any) => {
      if (res) {
        console.log(res);
        this.getWorkerPhaseByWorkerId();
        this.spinner.hide();
      }
    }, (err) => {
      alert("Xảy ra lỗi, vui lòng F5 lại trang!")
    });
  }

  phaseWorkerId: string;
  orderId: string;
  setInfo(phaseWorkerId: string, orderId: string){
    this.phaseWorkerId = phaseWorkerId;
    this.orderId = orderId;
  }



  managerNote: string;
  workerNote: string;
  editPhaseWorker: string;
  setWorkerNote(note: string, id: string){
    this.workerNote = note;
    this.editPhaseWorker = id;
  }

  setManagerNote(note: string, id: string){
    this.managerNote = note;
    this.editPhaseWorker = id;
  }



  formNoteManager: FormGroup;
  formNoteWorker: FormGroup;

  setUpFormNoteWorker() {
    this.formNoteWorker = new FormGroup({
      note: new FormControl('', [])
    })
  }

  setUpFormNoteManager() {
    this.formNoteManager = new FormGroup({
      note: new FormControl('', [])
    })
  }
  saveWorkerNote(){
    this.spinner.show();
    let url = CONSUME_API.ORDER.ADD_WORKER_NOTE;
    let param = {
      'orderPhaseWorkerId': this.editPhaseWorker,
      'note': this.formNoteWorker.value.note
    }
    url += "?" + this.xhr.buildBodyParam(param);
    this.xhr.get(url).subscribe((res: any) => {
      if (res) {
        this.getWorkerPhaseByWorkerId();
        this.spinner.hide();
      }
    }, (err) => {
      alert("Xảy ra lỗi, vui lòng F5 lại trang!")
    });
  }

  saveManagerNote(){
    this.spinner.show();
    let url = CONSUME_API.ORDER.ADD_MANAGER_NOTE;
    let param = {
      'orderPhaseWorkerId': this.editPhaseWorker,
      'note': this.formNoteManager.value.note
    }
    url += "?" + this.xhr.buildBodyParam(param);
    this.xhr.get(url).subscribe((res: any) => {
      if (res) {
        this.getWorkerPhaseByWorkerId();
        this.spinner.hide();
      }
    }, (err) => {
      alert("Xảy ra lỗi, vui lòng F5 lại trang!")
    });
  }

  isManager: boolean = false;
  checkIfAdmin() {
    let role = sessionStorage.getItem("role");
    if (role === "ADMIN") {
      this.isManager = true;
    }
  }
  confirmCancelJob() {
    this.spinner.show();
    let url = CONSUME_API.ORDER.CANCEL_PHASE;
    let param = {
      'phaseWorkerId': this.phaseWorkerId
    }
    url += "?" + this.xhr.buildBodyParam(param);
    this.xhr.get(url).subscribe((res: any) => {
      if (res) {
        this.getWorkerPhaseByWorkerId();
        this.spinner.hide();
      }
    }, (err) => {
      alert("Xảy ra lỗi, vui lòng F5 lại trang!")
    });
  }
}
