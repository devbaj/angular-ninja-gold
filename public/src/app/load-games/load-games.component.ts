import { GamedataService } from './../gamedata.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, } from '@angular/router';

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
    private _gamedataService: GamedataService,
    private _activatedRoute: ActivatedRoute,
  ) {
    this.listOfGames = [];
  }

  // * responsible for grabbing list of user's saved games when route activated, and grabs userid from url
  // * populates game list based on response from server
  ngOnInit() {
    this.sub = this._activatedRoute.params.subscribe( params => {
      this.userid = params.userid;
      let observable = this._gamedataService.getSavedGames(this.userid);
      observable.subscribe( data => {
        this.listOfGames = data.data;
        this._gamedataService.listOfGames = data.data;
      });
    });
  }

  // * ensures we can request updated information each time this route is hit
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
