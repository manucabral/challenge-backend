/**
 * @file Contains the user model
 */

const Sequelize = require('sequelize')
const { sequelize } = require('../database')
const { encrypt } = require('../utils/bcrypt')

const User = sequelize.define(
  'user',
  {
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
)

/**
 * Hash the password before creating a user using bcrypt.
 * @param {Object} user - The user instance.
 * @param {Object} _ - The options object. Not used.
 * @throws {Error} If the password is not a string.
 */
User.beforeCreate(async (user, _) => {
  try {
    user.password = await encrypt(user.password)
  } catch (error) {
    console.log(error)
  }
})

module.exports = User
