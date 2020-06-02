import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mobile-header',
  templateUrl: './mobile-header.component.html',
  styleUrls: ['./mobile-header.component.css']
})
export class MobileHeaderComponent implements OnInit {

  constructor() { }
  isNavbarCollapsed = false;
  ngOnInit(): void {
    this.checkUser();
  }
  userId: string;
  checkUser(){
    this.userId = sessionStorage.getItem("userId");
  }
}
