/**
 * @file Contains the main entry point for the app.
 * @author Manuel Cabral
 */

// required modules
const app = require('./server')

// start the server
app.listen(app.get('port'), () => {
	console.log(`Server running on port ${app.get('port')}`)
})
