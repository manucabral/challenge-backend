/**
 * @file Contains the express server configuration.
 */

// required modules
const path = require('path')
const express = require('express')
const morgan = require('morgan')
const auth = require('./middlewares/auth')
const compression = require('compression')
const fileUpload = require('express-fileupload')
const { PORT } = require('./config')

// required routes
const charactersRoutes = require('./routes/characters.routes')
const moviesRoutes = require('./routes/movies.routes')
const genresRoutes = require('./routes/genres.routes')
const authRoutes = require('./routes/auth.routes')

// create the express app
const app = express()
const logger = morgan('dev')
const publicPath = path.resolve(__dirname, '../public')

// set the port
app.set('port', PORT)

// use the compression middleware
app.use(compression())

// use the morgan middleware
app.use(logger)

// use json data
app.use(express.json())

/**
 * use express-fileupload middleware
 * NOTE: do not store files, better use a cloud service. This is just for demo purposes.
 */
app.use(fileUpload())

// use public folder
app.use(express.static(publicPath))

// use routes
app.use('/auth', authRoutes)
app.use('/characters', auth, charactersRoutes)
app.use('/movies', auth, moviesRoutes)
app.use('/genres', auth, genresRoutes)

// export the app
module.exports = app
