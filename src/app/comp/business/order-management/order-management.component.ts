import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser'
import {Router, ActivatedRoute} from '@angular/router'
import { HttpConnectorService } from '../../../service/http-connector.service/http-connector.service.component'
import { CONSUME_API } from '../../../service/services/consume-apis';
import { FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.css']
})
export class OrderManagementComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
  ) { }

  customerName: string;
  customerId: string;
  ngOnInit(): void {
    this.customerName = sessionStorage.getItem("customerName");
    this.customerId = this.route.snapshot.paramMap.get("id");
  }

}
