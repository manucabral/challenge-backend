/**
 * @file Contains all variables used in the app.
 */

// required modules
const { config } = require('dotenv')

// load the environment variables
config()

module.exports = {
  PORT: process.env.PORT || 3000,

  JWT: {
    SECRET: process.env.JWT_SECRET || 'secretwow',
    EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1d',
  },

  DATABASE: {
    NAME: process.env.DATABASE_NAME || 'disney',
    HOST: process.env.DATABASE_HOST || 'localhost',
    DIALECT: process.env.DATABASE_DIALECT || 'postgres',
    USERNAME: process.env.DATABASE_USERNAME || 'postgres',
    PASSWORD: process.env.DATABASE_PASSWORD || 'supersecret',
    FILL: process.env.DATABASE_FILL || false,
  },
}
