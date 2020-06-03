import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { Title } from '@angular/platform-browser'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(
    private title: Title,
    private router: Router
  ) {
    this.title.setTitle("Phần mềm quản lí");
   }

  ngOnInit(): void {
    let id = sessionStorage.getItem("userId");
    if (id === null || id === undefined) {
      this.router.navigate(['/cis/login']);
    }
  }
}
