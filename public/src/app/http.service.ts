import { Game } from './game';
import { User } from './user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor( private _http: HttpClient ) { }

  // * responsible for gathering the list of all users
  // TODO: deprecate this once we are managing dupe checking serverside
  getAllUsers() {
    return this._http.get('/users/all');
  }

  // * responsible for sending a PUT request to the database when called by UserReg component
  // @param newUser: the User object to be stored in the database
  addUser( newUser: User ) {
    return this._http.put( '/users/new', newUser );
  }

  // * responsible for sending entered information to server when called by Login component
  // @param attempt: the User object containing the login attempt information
  loginUser( attempt: User ) {
    return this._http.post( '/users/login' , attempt );
  }

  // * responsible for posting game information to server
  // @param game: the Game object to be stored
  saveGame( game: Game ) {
    return this._http.post( '/records/save' , game );
  }

  // * responsible for GETting list of game objects associated with user
  // @param userid: the db-generated id of the user whose games we are seeking
  getSavedGames( userid: string ) {
    return this._http.get(`/records/load/${userid}`);
  }

}
