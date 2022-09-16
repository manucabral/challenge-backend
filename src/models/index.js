/**
 * @file Contains the database models exports and relationships.
 */

// require all models
const MovieCast = require('./MovieCast')
const Character = require('./Character')
const Movie = require('./Movie')
const User = require('./User')
const Genre = require('./Genre')

// M-N relationship between movies and characters
Movie.belongsToMany(Character, { through: MovieCast })
Character.belongsToMany(Movie, { through: MovieCast })

// 1-N relationship between movies and genres
Movie.belongsTo(Genre)
Genre.hasMany(Movie)

module.exports = {
  Character,
  Movie,
  User,
  Genre,
}
