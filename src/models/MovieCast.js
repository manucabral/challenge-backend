const { sequelize } = require('../database')

const MovieCast = sequelize.define(
  'movieCast',
  {},
  {
    timestamps: false,
  }
)

module.exports = MovieCast
