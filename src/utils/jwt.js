/**
 * @file Contains jwt functions.
 */

// required modules
const jwt = require('jsonwebtoken')
const { SECRET, EXPIRES_IN } = require('../config').JWT

/**
 * Generate a token.
 * @param {Object} payload - The payload to sign.
 * @param {Object} options - The options to sign the token. If not provided, the default options will be used.
 * @returns {string} The token.
 * @throws {Error} Token can't be generated.
 */
const generateToken = (payload, options) => {
  try {
    return jwt.sign(payload, SECRET, options || { expiresIn: EXPIRES_IN })
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * Verify a token.
 * @param {string} token - The token to verify.
 * @param {Object} options - The options to verify the token. If not provided, the default options will be used.
 * @returns {Object} The decoded token payload.
 * @throws {Error} Token can't be verified.
 */
const verifyToken = (token, options) => {
  try {
    return jwt.verify(token, SECRET, options || { expiresIn: EXPIRES_IN })
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  generateToken,
  verifyToken,
}
