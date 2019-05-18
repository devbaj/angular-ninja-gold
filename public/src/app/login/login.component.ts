import { AppComponent } from './../app.component';
import { HttpService } from './../http.service';
import { User } from './../user';
import { Component, OnInit, Input } from '@angular/core';
import { GamedataService } from '../gamedata.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  pin: number;
  userid?: string;
  games?: [object];
  attempt = new User( this.username, this.pin);
  error?: string;
  @Input() userNameList: [];

  constructor(
    private _httpService: HttpService,
    private _gamedataService: GamedataService,
    private _appComponent: AppComponent
    ) {
    this.attempt = new User (
      this.username, this.pin, this.userid, this.games
    );
  }

  ngOnInit() {
    console.log( 'login component init' );
    this._appComponent.getUserList();
  }

  // todo: remove when finished
  get diagnostic() {
    return JSON.stringify( { component: 'login', data: this.attempt } )
  }

  logInUser() {
    console.log( 'submitted credentials' , this.attempt );
    const observable = this._httpService.loginUser( this.attempt );
    observable.subscribe( data => {
      console.log( data[`message`] );
      console.log( data[`data`] );
      if ( data[`message`] === 'success') {
        this._gamedataService.setUser(data[`data`][`userid`], data[`data`][`username`]);
        this._gamedataService.loggedIn = true;
        this._appComponent.setUser(data[`data`][`userid`]);
      } else {
        this.error = 'You could not be logged in';
      }
    } );
  }

}
