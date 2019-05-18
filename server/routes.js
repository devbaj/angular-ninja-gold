const controller = require( './controller' ); // * controller contains all logic for routes
const path = require( 'path' );

module.exports = app => {
	app.get( '/users/all', controller.allUsers );
	app.put('/users/new', controller.addUser );
	app.post( '/users/login', controller.loginUser );
	app.post( '/records/save', controller.saveGame );
	app.get('/records/load/:userid' , controller.retrieveSavedGames );
	// * wildcard route ensures that we don't reject an http request made by our Angular router
	app.all("*", ( req , res )=> {
		return res.sendFile(path.resolve("./public/dist/public/index.html"));
	})
}