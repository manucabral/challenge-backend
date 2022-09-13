/**
 * @file Contains all variables used in the app.
 * @author Manuel Cabral
 */

// required modules
const { config } = require('dotenv')

// load the environment variables
config()

module.exports = {
  PORT: process.env.PORT || 3000,
  SECRET: process.env.SECRET || 'secret',

  DATABASE: {
    NAME: process.env.DATABASE_NAME || 'disney',
    HOST: process.env.DATABASE_HOST || 'localhost',
    DIALECT: process.env.DATABASE_DIALECT || 'postgres',
    USERNAME: process.env.DATABASE_USERNAME || 'postgres',
    PASSWORD: process.env.DATABASE_PASSWORD || 'supersecret',
  },
}
