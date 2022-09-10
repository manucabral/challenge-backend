/**
 * @file Contains the express server configuration.
 * @author Manuel Cabral
 */

// required modules
const express = require('express')
const compression = require('compression')
const morgan = require('morgan')
const { PORT } = require('./config')

// create the express app
const app = express()
const logger = morgan('dev')

// set the port
app.set('port', PORT)

// use the compression middleware
app.use(compression())

// use the morgan middleware
app.use(logger)

// export the app
module.exports = app
