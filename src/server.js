/**
 * @file Contains the express server configuration.
 */

// required modules
const express = require('express')
const morgan = require('morgan')
const compression = require('compression')
const { PORT } = require('./config')

// required routes
const charactersRoutes = require('./routes/characters.routes')
const moviesRoutes = require('./routes/movies.routes')
const authRoutes = require('./routes/auth.routes')

// create the express app
const app = express()
const logger = morgan('dev')

// set the port
app.set('port', PORT)

// use the compression middleware
app.use(compression())

// use the morgan middleware
app.use(logger)

// use json data
app.use(express.json())

// use routes
app.use('/auth', authRoutes)
app.use('/characters', charactersRoutes)
app.use('/movies', moviesRoutes)

// export the app
module.exports = app
