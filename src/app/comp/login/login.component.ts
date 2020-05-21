import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser'

import { HttpConnectorService } from '../../service/http-connector.service/http-connector.service.component'
import { CONSUME_API } from '../../service/services/consume-apis';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private title: Title,
    private xhr: HttpConnectorService
  ) { 
    this.title.setTitle("Đăng nhập");
  }

  ngOnInit(): void {
    this.login();
  }

  login(){
    let url = CONSUME_API.USERS.logIn;
    this.xhr.get(url).subscribe((res: any) => {
      if (res) {
        console.log('SUCCESSFULL');
      }
    }, (err) => {
      
    });
  }
}
