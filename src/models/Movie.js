/**
 * @file Movie model represents a movie from disney
 */

const Sequelize = require('sequelize')
const { sequelize } = require('../database')

const Movie = sequelize.define('movie', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: Sequelize.STRING,
  },
  image: {
    type: Sequelize.STRING,
  },
  releaseDate: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
  qualification: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 5,
    },
  },
})

module.exports = Movie
