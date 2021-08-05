import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public isLogout;
  constructor() { this.isLogout = true }

  ngOnInit(): void {

  }

  Logout = function () {
    localStorage.clear();
    window.location.href = "/login";

  }
}
