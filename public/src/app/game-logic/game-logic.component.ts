import { Game } from './../game';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { GamedataService } from '../gamedata.service';
import { Turn } from '../turn';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game-logic',
  templateUrl: './game-logic.component.html',
  styleUrls: ['./game-logic.component.css']
})
export class GameLogicComponent implements OnInit, OnDestroy {
  maxTurns: number;
  locations: any;
  turnHistory: any;
  over?: boolean;
  gold?: number;
  sub?: any;

  constructor(
    private _gamedataService: GamedataService,
    private _activatedRoute: ActivatedRoute
  ) {
    this.maxTurns = 10; // TODO: let user determine number of turns they want their game to last
    this.locations = this._gamedataService.locations;
  }

  // * on route activation, looks for a gameid in url. if none exists, instantiates a new game
  // * if gameid parameter is found in url, calls the resumegame method
  ngOnInit() {
    this.sub = this._activatedRoute.params.subscribe ( params =>{
      if ( `gameid` in params ) {
        this.resumeGame(params.gameid);
      } else {
        this._gamedataService.game = new Game(this._gamedataService.userid);
      }
    });
  }

  // * manages main logic for each turn; changes total gold, increments turn count, and pushes information into the turn log
  // * also checks to see if max turns is met, if so, calls gamedaa service to end the game
  // @param location: the user's chosen location, info hard-coded in game data service constructor
  visit( location: any ) {
    const change = this.generateChange( location[`max`] , location[`min`]);
    this._gamedataService.game.gold += change;
    this._gamedataService.game.turns += 1;
    let turnData = new Turn( location[`name`], change );
    console.log('turn data' , turnData);
    this._gamedataService.game.activityLog.push( turnData );
    this.turnHistory = this._gamedataService.game.activityLog;
    if (this._gamedataService.game.turns >= this.maxTurns ) {
      this._gamedataService.endGame(this._gamedataService.game);
    }
    this.gold = this._gamedataService.game.gold;
  }

  // * simple function to generate gold earned for each turn; broken out of turn method for readability
  // @param max: the max gold possible, based on specific location
  // @param min: min gold possible based on location
  generateChange( max: number, min: number ): number {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  // * responsible for calling gamedata service's save method whenever user clicks the save button
  saveGame() {
    this._gamedataService.saveGame(this._gamedataService.game);
  }

  // * responsible for setting this instance's variables when a saved game is loaded; called by constructor if there is a gameid parameter
  // * calls game data service's load method
  // @ param gameid: the db-generated id of the game, which will only exist if a game has been saved in db; grabbed from url by constructor
  resumeGame(gameid: string) {
    var game = this._gamedataService.loadGameState(gameid);
    this.gold = game.gold;
    this.turnHistory = game.activityLog;
    this.over = game.isOver;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
