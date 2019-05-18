const mongoose = require( 'mongoose' );
mongoose.connect( 'mongodb://localhost/ninja_gold' , { useNewUrlParser: true } );
mongoose.set('useFindAndModify',false);

// * Turns hold only the data necessary for Angular to render the activity log
TurnSchema = new mongoose.Schema( {
	location: { type: String , required: true } ,
	goldChange: { type: Number , required: true } ,
} );

// * Games hold on to a snapshot of the user's gamestate when they save, with all information needed to allow users to resume or review a game
GameSchema = new mongoose.Schema( {
	turnNumber: { type: Number , default: 0 } ,
	gold: { type: Number , default: 0 },
	isOver: { type: Boolean , default: false } ,
	turnLog: [ TurnSchema ]
} , {
	timestamps: true
} )

// * Users hold basic user info as well as an array of all their games, so that we can look up all games associated with a specific user
UserSchema = new mongoose.Schema( {
	username: {
		type : String,
		required: [ true , 'Username is required' ],
		minlength: 3 ,
		lowercase: true
	} ,
	pin: {
		type: Number ,
		required: [ true , 'PIN is required' ] ,
		min: 1000 ,
		max: 9999
	} ,
	games: [ GameSchema ]
} , {
	timestamps: true
} )
var User = mongoose.model( 'User' , UserSchema );

// * we only need to export User because Users already contain Games and Games contain Turns
module.exports = User;