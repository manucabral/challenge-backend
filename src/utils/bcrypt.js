/**
 * @file Contains functions to encrypt and decrypt data.
 */

// required modules
const bcrypt = require('bcrypt')

/**
 * Encrypts a string.
 * @param {string} string - The string to encrypt.
 * @returns {string} The encrypted string.
 * @throws {Error} If the string is not a string.
 */
const encrypt = async (string) => {
  if (typeof string !== 'string') throw new Error('No string provided.')
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(string, salt)
}

/**
 * Compares a string with an encrypted string.
 * @param {string} string - The string to compare.
 * @param {string} encryptedString - The encrypted string.
 * @returns {boolean} True if the strings match, false otherwise.
 * @throws {Error} If the string is not a string.
 */
const compare = async (string, encryptedString) => {
  if (typeof string !== 'string') throw new Error('No string provided.')
  return bcrypt.compare(string, encryptedString)
}

module.exports = {
  encrypt,
  compare,
}
