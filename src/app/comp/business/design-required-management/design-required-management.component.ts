import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser'
import { Router } from '@angular/router'
import { HttpConnectorService } from '../../../service/http-connector.service/http-connector.service.component'
import { CONSUME_API } from '../../../service/services/consume-apis';
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-design-required-management',
  templateUrl: './design-required-management.component.html',
  styleUrls: ['./design-required-management.component.css']
})
export class DesignRequiredManagementComponent implements OnInit {

  constructor(
    private title: Title,
    private xhr: HttpConnectorService,
    //private toarst: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {
    this.title.setTitle("Quản lí các yêu cầu thiết kế");
  }

  ngOnInit(): void {
    this.getAllOrder();
    this.setupForm();
    this.getAllRequired();
    this.userId = sessionStorage.getItem("userId");
  }

  formRequired: FormGroup;
  userId: string;
  setupForm(){
    this.formRequired = new FormGroup({
      name: new FormControl('', []),
      desc: new FormControl('', []),
      note: new FormControl('', []),
      imageLink: new FormControl('', []),
    })
  }

  orderId: string;
  lstOrder: any = [];
  selectOption(event: any) {
    this.orderId = event;
    console.log(this.orderId);
  }

  currentPage: number = 0;
  getAllOrder() {
    this.spinner.show();
    let url = CONSUME_API.ORDER.GET_ALL_ORDER;
    this.xhr.get(url).subscribe((res: any) => {
      if (res) {
        this.lstOrder = res.result;
        this.spinner.hide();
      }
    }, (err) => {

    });
  }

  createRequired(){
    let url = CONSUME_API.REQUIRED.CREATE_REQUIRED;
    let body = {
      'requiredTitle': this.formRequired.value.name,
      'requiredDesc': this.formRequired.value.desc,
      'note': this.formRequired.value.note,
      'imageLink': this.formRequired.value.imageLink,
      'orderId': this.orderId
    }
    this.xhr.post(url,body).subscribe((res: any) => {
      if (res) {
        this.getAllRequired();
        this.spinner.hide();
      }
    }, (err) => {

    });
  }

  lstRequired: any = [];
  getAllRequired(){
    this.spinner.show();
    let url = CONSUME_API.REQUIRED.GET_ALL_REQUIRED;
    this.xhr.get(url).subscribe((res: any) => {
      if (res) {
        this.lstRequired = res.result;
        this.spinner.hide();
      }
    }, (err) => {

    });
  }

  editRequiredId: string;
  imageLink: string;
  setInfo(required: any) {
    this.editRequiredId = required.id;
    this.imageLink = required.imageLink;
  }

  confirmCompleteRequired(){
    this.spinner.show();
    let url = CONSUME_API.REQUIRED.CONFIRM_COMPLETE_REQUIRED;
    let param = {
      'requiredId': this.editRequiredId,
      'userId': this.userId
    }
    url += "?" + this.xhr.buildBodyParam(param);
    this.xhr.get(url).subscribe((res: any) => {
      if (res) {
        this.getAllRequired();
        this.spinner.hide();
      }
    }, (err) => {

    });
  }


  isEdited: boolean = false;
  setCreateNew() {
    this.isEdited = false;
    this.formRequired.reset();
  }
  setEdited(required: any){
    this.editRequiredId = required.id;
    this.isEdited = true;
    this.formRequired.setValue({
      name: required.requiredName,
      desc: required.requiredDesc,
      note: required.note,
      imageLink: required.imageLink,
    }) 
  }
  updateRequired(){
    
    let url = CONSUME_API.REQUIRED.REQUIREDS + "/" + this.editRequiredId;
    let body = {
      'requiredName': this.formRequired.value.name,
      'requiredDesc': this.formRequired.value.desc,
      'note': this.formRequired.value.note,
      'imageLink': this.formRequired.value.imageLink,
    }
    this.xhr.patch(url,body).subscribe((res: any) => {
      if (res) {
        this.getAllRequired();
        this.setCreateNew();
        this.spinner.hide();
      }
    }, (err) => {

    });
  }

  deleteRequired(){
    let url = CONSUME_API.REQUIRED.REQUIREDS + "/" + this.editRequiredId;
    this.xhr.delete(url).subscribe((res: any) => {
        this.getAllRequired();
        this.spinner.hide();
    }, (err) => {

    });
  }
}
