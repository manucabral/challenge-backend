const Sequelize = require('sequelize')
const { sequelize } = require('../database')

const Genre = sequelize.define(
  'genre',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: false,
  }
)

module.exports = Genre
