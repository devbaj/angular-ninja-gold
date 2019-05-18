import { GamedataService } from './../gamedata.service';
import { HttpService } from './../http.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-load-games',
  templateUrl: './load-games.component.html',
  styleUrls: ['./load-games.component.css']
})
export class LoadGamesComponent implements OnInit, OnDestroy {
  sub: any;
  userid: string;
  listOfGames: any;

  constructor(
    private _httpService: HttpService,
    private _gamedataService: GamedataService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {
    this.listOfGames = [];
  }

  ngOnInit() {
    console.log('load-game component init');
    this.sub = this._activatedRoute.params.subscribe( params => {
      this.userid = params.userid;
      let observable = this._gamedataService.getSavedGames(this.userid);
      observable.subscribe( data => {
        this.listOfGames = data.data;
        this._gamedataService.listOfGames = data.data;
        console.log('ON INIT' , this.listOfGames);
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
