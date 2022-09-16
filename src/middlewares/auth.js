/**
 * @file Contains the authentication middleware.
 */

// required modules
const { verifyToken } = require('../utils/jwt')

/**
 * Authenticates a user by a token.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Object} next - The next middleware.
 * @throws {Error} - Throws an error if the token is invalid.
 */
const authenticate = async (req, res, next) => {
  // NOTE: the header not uses Bearer
  const token = req.header('Authorization')
  if (!token) return res.status(401).json({ message: 'No authorized.' })
  try {
    const decoded = await verifyToken(token)
    if (!decoded) return res.status(401).json({ message: 'Invalid token.' })
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate to continue.' })
  }
}

module.exports = authenticate
