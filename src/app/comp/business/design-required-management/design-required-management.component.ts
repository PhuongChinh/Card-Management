import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser'
import { Router,ActivatedRoute } from '@angular/router'
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
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.title.setTitle("Quản lí các yêu cầu thiết kế");
  }

  customerId: string;
  isSeeAllRequired: boolean = true;
  ngOnInit(): void {
    this.customerId = this.route.snapshot.paramMap.get("customerId");
    if (this.customerId === "all") {
      this.getAllRequired();
      this.isSeeAllRequired = true;
    } else {
      this.getAllRequiredByCustomerId();
      this.isSeeAllRequired = false;
    }
    this.setupForm();
    this.getAllOrder();
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
    if (this.isSeeAllRequired === false) {
      this.orderId = "NO ORDER";
    } else {
      this.customerId = "";
    }
    let url = CONSUME_API.REQUIRED.CREATE_REQUIRED;
    let body = {
      'requiredTitle': this.formRequired.value.name,
      'requiredDesc': this.formRequired.value.desc,
      'note': this.formRequired.value.note,
      'imageLink': this.formRequired.value.imageLink,
      'orderId': this.orderId,
      'customerId': this.customerId
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

  getAllRequiredByCustomerId(){
    this.spinner.show();
    let url = CONSUME_API.REQUIRED.GET_ALL_REQUIRED_BY_CUSTOMER_ID;
    let param = {
      'customerId': this.customerId
    }
    url += "?" + this.xhr.buildBodyParam(param)
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
        if (this.isSeeAllRequired) {
          this.getAllRequired();
        } else {
          this.getAllRequiredByCustomerId();
        }
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
        if (this.isSeeAllRequired) {
          this.getAllRequired();
        } else {
          this.getAllRequiredByCustomerId();
        }
        this.setCreateNew();
        this.spinner.hide();
      }
    }, (err) => {

    });
  }

  deleteRequired(){
    let url = CONSUME_API.REQUIRED.DELETE_REQUIRED;
    let param = {
      'requiredId': this.editRequiredId
    }
    url += "?" + this.xhr.buildBodyParam(param);
    this.xhr.delete(url).subscribe((res: any) => {
      if (this.isSeeAllRequired) {
        this.getAllRequired();
      } else {
        this.getAllRequiredByCustomerId();
      }
      this.spinner.hide();
    }, (err) => {

    });
  }
}
