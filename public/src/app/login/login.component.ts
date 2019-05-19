import { AppComponent } from './../app.component';
import { HttpService } from './../http.service';
import { User } from './../user';
import { Component, OnInit, Input } from '@angular/core';
import { GamedataService } from '../gamedata.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../app.component.css', './login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  pin: number;
  userid?: string;
  games?: [object];
  attempt = new User(this.username, this.pin);
  error?: string;
  @Input() userNameList: []; // TODO: deprecate once dupe check is serverside

  // * ties User object to information input in form
  constructor(
    private _httpService: HttpService,
    private _gamedataService: GamedataService,
    private _appComponent: AppComponent
  ) {
    this.attempt = new User(this.username, this.pin, this.userid, this.games);
  }

  // TODO: deprecate once dupe check is serverside
  ngOnInit() {
    this._appComponent.getUserList();
  }

  // * responsible for calling http service to check user info; if attempt success, calls GamedataService and AppComponent to
  // * set user info and sets AppComponent's logged in flag to true
  logInUser() {
    const observable = this._httpService.loginUser(this.attempt);
    observable.subscribe(data => {
      if (data[`message`] === 'success') {
        this._gamedataService.setUser(data[`data`][`userid`], data[`data`][`username`]);
        this._appComponent.loggedIn = true;
        this._appComponent.setUser(data[`data`][`userid`]); // ? can this be deprecated? or called by gamedata service?
      } else {
        this.error = 'You could not be logged in';
      }
    });
  }
}
