/**
 * @file Character model represents a character from disney
 */

const Sequelize = require('sequelize')
const { sequelize } = require('../database')

const Character = sequelize.define('character', {
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
  age: {
    type: Sequelize.INTEGER,
  },
  weight: {
    type: Sequelize.FLOAT,
  },
  story: {
    // limit to 64 KB (65.535 characters)
    type: Sequelize.TEXT,
  },
})

module.exports = Character
