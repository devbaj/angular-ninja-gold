import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Ninja Gold';
  userid?: string; // userid will not exist until a user logs in or registers
  loggedIn: boolean;
  userNameList: []; // TODO: deprecate this once we move duplicate checking to server side

  constructor(
    private _httpService: HttpService,
    private _router: Router

    ) {
      this.loggedIn = false;
    }

  ngOnInit() {
  }

  // TODO: deprecate this method once we move dupe checking serverside
  getUserList() {
    const observable = this._httpService.getAllUsers();
    observable.subscribe(data => {
      this.userNameList = data[`users`];
  } );
  }

  // * responsible for storing the userid once a user has logged in; this is how we will keep track of who each game belongs to
  setUser(userid: string) {
    this.userid = userid;
    this.loggedIn = true;
    this._router.navigate(['/game']); // TODO: redirect user to a dashboard on login instead of a new game
  }

  // * responsible for resetting app to its original state when a user logs out
  logOut(){
    this.userid = null;
    this.loggedIn = false;
    this._router.navigate(['/login']);
  }

}
