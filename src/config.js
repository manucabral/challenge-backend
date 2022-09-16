/**
 * @file Contains all variables used in the app.
 */

// required modules
const { config } = require('dotenv')

// load the environment variables
config()

module.exports = {
  HOST: process.env.HOST,
  PORT: process.env.PORT || 3000,

  JWT: {
    SECRET: process.env.JWT_SECRET || 'secretwow',
    EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1d',
  },

  DATABASE: {
    USER: process.env.DATABASE_USERNAME || 'postgres',
    PASSWORD: process.env.DATABASE_PASSWORD || 'postgres',
    HOST: process.env.DATABASE_HOST || 'localhost',
    PORT: process.env.DATABASE_PORT || 5432,
    NAME: process.env.DATABASE_NAME || 'disney',
    FILL: process.env.DATABASE_FILL === 'true' || false,
    DIALECT: process.env.DATABASE_DIALECT || 'postgres',
  },
}
