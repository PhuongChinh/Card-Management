import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  constructor(
    private titleService: Title
  ) {
    this.titleService.setTitle("Quản lí công nhân");
  }

  ngOnInit(): void {
  }

}
