import { Game } from './game';
import { User } from './user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor( private _http: HttpClient ) { }




  getAllUsers() {
    return this._http.get('/users/all');

  }

  addUser( newUser: User ) {
    return this._http.put( '/users/new', newUser );
  }

  loginUser( attempt: User ) {
    return this._http.post( '/users/login' , attempt );
  }

  saveGame( game: Game ) {
    console.log ( 'SAVE GAME REQUEST SENT' );
    return this._http.post( '/records/save' , game );
  }

  getSavedGames( userid: any ) {
    return this._http.get(`/records/load/${userid}`);
  }

}
