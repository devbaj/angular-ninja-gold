var User = require( './models' );

module.exports = {

	// * returns an array of all usernames to the client, so that Angular can notify them if the username is taken
	// TODO: move checking to backend so we aren't sending our entire username list to each client; put it in 'addUser' function;
	allUsers: ( req , res ) => {
    User.find()
    .then( data => {
      var userNameList = [];
      for ( let user of data){
        userNameList.push(user.username);
      }
      res.json({users: userNameList})
    })
    .catch(err => res.json(err))
	} ,

	// * adds a new user to the database; the request body should contain only a username and pin
	// TODO: move username dupe checking here from client side
	addUser: ( req , res ) => {
		User.create( req.body )
		.then( data => res.json( { message: 'success' , data: data } ) ) // TODO: we don't need to send the entire user's info back to client, just id and username
		// ? could we just have the registration component call the login method once they've added the user to the database? perhaps call the http service's login method
		.catch( err => res.json( { message: 'error' , error: err } ) );
	} ,


	// * looks up request body and if it finds a matching username, attempts to verify PIN; if login attempt passes, we send the userid and username back to client
	// @param req.body should contain username and pin
	loginUser: ( req , res ) => {
		User.findOne( { username: req.body.username } )
		.then( data => {
			if ( data.pin != req.body.pin ) {
        res.json( {
          message: 'error' ,
          error: 'incorrect PIN'
        } )
      } else {
        res.json ( {
          message: 'success' ,
          data: {
            username: data.username,
            userid: data._id,
          }
        } )
      }
		} )
		.catch(err => res.json( { message: 'error' , error: err } ) )
	},

	// * saves a user's game state; first checks to see if game already exists: if it does, it overwrites the existing information rather than pushing in a new savegame
	// @param if req.body contains a gameid, it means that the game being saved was supplied by the database rather than being a newly created game. In that case, we overwrite it with $set
	// @param if there is no gameid in req.body, the save from a fresh game, and we add it to the user's list with $push
	saveGame: ( req , res ) => {
		if ( 'gameid' in req.body ) {
			User.findOneAndUpdate( {'games._id': req.body.gameid} , {$set: { 'games.$.gold': req.body.gold , 'games.$.turnNumber': req.body.turns, 'games.$.isOver': req.body.isOver, 'games.$.turnLog': req.body.actvityLog} } )
			.then( data => res.json( { message: 'success' } ) )
			.catch( err => res.json( { message: 'error', error: err } ) );
		} else {
			User.findByIdAndUpdate( req.body.userid, { $push: { games: { gold: req.body.gold, turnNumber: req.body.turns, isOver: req.body.isOver, turnLog: req.body.activityLog } } } )// * game has never been saved before
			.then( data => res.json( { message: 'success' } ) )
			.catch( err => res.json( { message: 'error', error: err } ) );
		}
	} ,

	// * gets a list of a user's saved games based on their userid and passes them to client for display
	retrieveSavedGames: (req , res) => {
		User.findById( req.params.userid )
		.then( data => res.json( { message: 'success', data: data.games } ) )
		.catch( err => res.json( { message: 'error' , error: err } ) )
	}

}