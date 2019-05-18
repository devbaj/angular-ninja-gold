import { AppComponent } from './../app.component';
import { HttpService } from './../http.service';
import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-user-reg',
  templateUrl: './user-reg.component.html',
  styleUrls: ['./user-reg.component.css']
})
export class UserRegComponent implements OnInit {
  username: string;
  pin: number;
  userid?: string;
  games?: [object];
  newUser = new User( this.username, this.pin, this.userid, this.games );
  @Input() userNameList: [];

  constructor(
    private _httpService : HttpService,
    private _appComponent: AppComponent
    ) { }

  ngOnInit() {
    console.log( 'user-reg component init' );
    this._appComponent.getUserList()
  }

  // todo : remove diagnostic when finished
  get diagnostic() {
    return JSON.stringify( { component: 'user-reg' , data: this.newUser } );
  }

  onSubmit() {
    console.log( 'SUBMITTED' , this.newUser );
    const observable = this._httpService.addUser(this.newUser);
    observable.subscribe( data => {
      console.log( 'PUT request returned:' , data );
      this._appComponent.setUser(data[`data`][`_id`]);
    });

  }
}
