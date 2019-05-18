import { Game } from './game';
import { HttpService } from './http.service';
import { User } from './user';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class GamedataService {
  userid: string;
  username: string;
  game?: Game;
  listOfGames: any;
  locations: object;
  loggedIn: boolean;


  constructor(
    private _httpService: HttpService
  ) {
    this.locations = {
      cave: {
        name: 'cave',
        min: 10,
        max: 20
      },
      farm: {
        name: 'farm',
        min: 5,
        max: 10
      },
      house: {
        name: 'house',
        min: 2,
        max: 5
      },
      casino: {
        name: 'casino',
        min: -50,
        max: 50
      }
    };
    this.loggedIn = false;
    console.log( this.locations );
  }

  // * This method is responsible for initializing a new game by calling the constructor for the Game class
  // @param userid - the id of the user currently logged in;
  startNewGame( userid: string ) {
    this.game = new Game( userid );
  }

  setUser(userid: string , username: string) {
    this.userid = userid;
    this.username = username;
    console.log( 'user set to', this.username , 'with id' , this.userid);
  }

  saveGame(game: Game) {
    console.log( 'DATA SERVICE SAVE' );
    console.log( 'userid' , this.userid );
    console.log( 'game info' , game );
    let observable = this._httpService.saveGame(game);
    observable.subscribe( data => console.log( 'saved' , data ) );
  }

  endGame(game: Game) {
    game.isOver = true;
    console.log( 'GAME OVER' );
    this.saveGame(game);
  }

  getSavedGames( userid: string ): any {
    return this._httpService.getSavedGames(userid);
  }

  loadGameState(gameid: string) {
    console.log( ' LOAD GAME STATE' , gameid);
    for ( let game of this.listOfGames ) {
      if ( game._id === gameid) {
        console.log( 'found matching game', game );
        this.game = this.game.resume(game);
      }
      console.log('in checker loop');
    }
    console.log('THIS GAME' , this.game);
    return this.game;
  }

}

