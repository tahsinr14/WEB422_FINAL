/*********************************************************************************
* WEB422 – Assignment 06
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part of this
* assignment has been copied manually or electronically from any other source (including web sites) or 
* distributed to other students.
* 
* Name: __Tahsin Rahman__ Student ID: __165063199_ Date: _December 2, 2021__
*
* Angular App (Deployed) Link: _____________________________________________________
*
* User API (Heroku) Link: https://assignment6-api-web422.herokuapp.com/
*
********************************************************************************/

import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'web422-a4';
  searchString: string = String();
  router: Router;
  token = Object();

  constructor(router: Router, private authService: AuthService) {
    this.router = router;
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.token = this.authService.readToken();
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  handleSearch() {
    this.router.navigate(['/search'], {
      queryParams: {
        q: this.searchString
      }
    });

    this.searchString = "";
  }
}
