export class Turn {

  constructor(
    public location: string,
    public goldChange: number
  ) {
    this.location = location;
    this.goldChange = goldChange;
  }
}
