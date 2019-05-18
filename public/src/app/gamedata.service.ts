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

  // * locations will never change, so we set them as soon as our service is created
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
  }

  // * This method is responsible for initializing a new game by calling the constructor for the Game class
  // @param userid - the id of the user currently logged in;
  startNewGame( userid: string ) {
    this.game = new Game( userid );
  }

  // * responsible for storing the current user so we can establish ownership of each game
  // @param userid: the current user's unique id from database
  // @param username: the current user's username
  setUser(userid: string , username: string) {
    this.userid = userid;
    this.username = username;
  }

  // * responsible for sending the current game data to the http service when called by game logic component
  // @param game: the game object to be saved
  saveGame(game: Game) {
    let observable = this._httpService.saveGame(game);
    observable.subscribe( data => console.log( 'saved' , data ) );
    // TODO: render an html element to notify user that their game was saved successfully
  }

  // * responsible for changing the flag to indicate the game is over
  // @param game: the game object that has ended
  endGame(game: Game) {
    game.isOver = true;
    this.saveGame(game);
  }

  // * responsible for calling the http service to get a list of the current user's saved games
  // @param userid: the current user's id
  getSavedGames( userid: string ): any {
    return this._httpService.getSavedGames(userid);
  }

  // * responsible for setting game information to the state of the save game upon load; calls the resume method for game class
  // @param: the gameid supplied by the load-games component to indicate which of the games should be loaded
  loadGameState(gameid: string) {
    for ( let game of this.listOfGames ) {
      if ( game._id === gameid) {
        this.game = this.game.resume(game);
      }
    }
    return this.game;
  }

}

