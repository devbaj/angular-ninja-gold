import { Turn } from './turn';
export class Game {
  gold: number;
  turns: number;
  isOver: boolean;
  activityLog: any;
  gameid?: string;

  constructor(
    public userid: string,
  ) {
    this.userid = userid;
    this.gold = 0;
    this.turns = 0;
    this.isOver = false;
    this.activityLog = [];
  }

  resume(gameData: any): Game{
    this.gold = gameData[`gold`];
    this.turns = gameData[`turnNumber`];
    this.isOver = gameData[`isOver`];
    this.activityLog = gameData[`turnLog`];
    this.gameid = gameData[`_id`];
    return this;
  }

}
