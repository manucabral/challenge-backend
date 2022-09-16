/**
 * @file Contains the user model
 */

const Sequelize = require('sequelize')
const { sequelize } = require('../database')
const { encrypt, compare } = require('../utils/bcrypt')
const { generateToken } = require('../utils/jwt')

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

/**
 * Check if the password is valid.
 * @param {string} password - The password to check.
 * @returns {boolean} True if the password is valid, false otherwise.
 */
User.prototype.isValidPassword = async function (password) {
  try {
    return await compare(password, this.password)
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * Generate a token for the user.
 * @returns {string} The token.
 * @throws {Error} If the token cannot be generated.
 */
User.prototype.generateToken = async function () {
  try {
    const payload = { email: this.email }
    return await generateToken(payload)
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = User
