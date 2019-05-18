import { GamedataService } from './gamedata.service';
import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { User } from './user';
import { Game } from './game';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Ninja Gold';
  userid?: string;
  loggedIn: boolean;
  userNameList: [];

  constructor(
    private _httpService: HttpService,
    private _gamedataService: GamedataService,
    private _router: Router

    ) {
      this.loggedIn = false;
    }

  ngOnInit() {
    console.log('Angular app init');
  }

  getUserList() {
    const observable = this._httpService.getAllUsers();
    observable.subscribe(data => {
      this.userNameList = data[`users`];
      console.log(this.userNameList);
  } );
  }

  setUser(userid: string) {
    this.userid = userid;
    this.loggedIn = true;
    this._router.navigate(['/game']);
  }

  logOut(){
    this.userid = null;
    this.loggedIn = false;
    this._router.navigate(['/login']);
  }

}
