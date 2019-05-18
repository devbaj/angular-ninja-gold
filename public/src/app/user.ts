export class User {
  constructor(
    public username: string,
    public pin?: number,
    public userid?: string,
    public games?: [object]
  ) {}
}
