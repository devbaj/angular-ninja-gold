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
    this.maxTurns = 10;
    this.locations = this._gamedataService.locations;
  }

  ngOnInit() {
    console.log('game logic component init');
    this.sub = this._activatedRoute.params.subscribe ( params =>{
      console.log( 'load game params' , params );
      if ( `gameid` in params ) {
        console.log ( 'found params' );
        this.resumeGame(params.gameid);
      } else {
        console.log ( 'no params found');
        this._gamedataService.game = new Game(this._gamedataService.userid);
      }
    });
    // if (this._activatedRoute.snapshot.queryParams[`gameid`]) {
      // console.log('there are params');
      // this.resumeGame(this._activatedRoute.snapshot.queryParams['gameid']);
    // } else { console.log( 'there are no params' ); }
  }

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
      this.over = true;
    }
    this.gold = this._gamedataService.game.gold;
  }

  generateChange( max: number, min: number ): number {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  saveGame() {
    this._gamedataService.saveGame(this._gamedataService.game);
  }

  resumeGame(gameid: string) {
    console.log ( 'resume game' , gameid);
    var game = this._gamedataService.loadGameState(gameid);
    this.gold = game.gold;
    this.turnHistory = game.activityLog;
    this.over = game.isOver;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
