import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import {role} from '../../../service/services/constant';
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { CONSUME_API } from 'src/app/service/services/consume-apis';
import { HttpConnectorService } from '../../../service/http-connector.service/http-connector.service.component'
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  constructor(
    private titleService: Title,
    private xhr: HttpConnectorService,
    private spinner: NgxSpinnerService
  ) {
    this.titleService.setTitle("Quản lí nhân viên");
  }

  ngOnInit(): void {
    this.setUpForm();
    this.getAllUser();
  }

  newUserRole: string = role.WORKER;
  selectOption(event: any) {
    console.log(event);
  }

  lstUser: any = [];
  // create new user
  formCreateNewUser: FormGroup;
  setUpForm(){
    this.formCreateNewUser = new FormGroup({
      name: new FormControl('', []),
      userName: new FormControl('', []),
      password: new FormControl('', []),
      phone: new FormControl('', []),
      role: new FormControl('', [])
    })
  }
  createNewUser(){
    this.spinner.show();
    let url = CONSUME_API.USERS.USERS;
    let body = {
      'userName': this.formCreateNewUser.value.userName,
      'fullName': this.formCreateNewUser.value.name,
      'password': this.formCreateNewUser.value.password,
      'role': this.newUserRole,
      'status': false
    }
    this.xhr.post(url,body).subscribe((res: any) => {
      if (res) {
        this.getAllUser();
        this.spinner.hide();
      }
    }, (err) => {

    });
  }

  getAllUser(){
    this.spinner.show();
    let url = CONSUME_API.USERS.USERS;
    this.xhr.get(url).subscribe((res: any) => {
      if (res) {
        console.log("user: ",res);
        this.lstUser = res._embedded.users;
        this.spinner.hide();
      }
    }, (err) => {

    });
  }
}
