import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.checkUser();
  }
  userId: string;
  checkUser(){
    this.userId = sessionStorage.getItem("userId");
  }
}
