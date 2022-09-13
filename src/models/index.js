/**
 * @file Contains the database models exports and associations.
 */

// require all models
const MovieCast = require('./MovieCast')
const Character = require('./Character')
const Movie = require('./Movie')

// M-N relationship between movies and characters
Movie.belongsToMany(Character, { through: MovieCast })
Character.belongsToMany(Movie, { through: MovieCast })

module.exports = {
  Character,
  Movie,
}
