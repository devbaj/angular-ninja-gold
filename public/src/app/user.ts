export class User {

  constructor(
    public username: string,
    public pin?: number,
    public userid?: string,
    public games?: [object]
  ) {}

}

const testUser = new User(
  'Test User',
  1111
);

console.log ( `I am a test user. My name is ${testUser.username} and my pin is ${testUser.pin}`);
