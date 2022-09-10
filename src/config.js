/**
 * @file Contains the configuration for the app.
 * @author Manuel Cabral
 */

// required modules
const { config } = require('dotenv')

// load the environment variables
config()

module.exports = {
	PORT: process.env.PORT || 3000,
	SECRET: process.env.SECRET || 'secret',
}
