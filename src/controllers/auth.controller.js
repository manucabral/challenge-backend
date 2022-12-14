/**
 * @file Contains the auth controller.
 */

const { User } = require('../models')
const { sendWelcomeEmail, canSendEmail } = require('../utils/email')

/**
 * Register and create a new user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const register = async (req, res) => {
  if (!req.body.email || !req.body.password)
    return res.status(400).send({ message: 'Email and password are required' })
  try {
    let user = await User.create(req.body)
    const token = await user.generateToken()
    if (canSendEmail())
      await sendWelcomeEmail({
        email: user.email,
        name: 'tester',
      })
    else if (process.env.NODE_ENV === 'development')
      console.log(
        "Can't send email. Please provide a valid API key and email address."
      )

    res.status(201).json({ token })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

/**
 * Login a user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const login = async (req, res) => {
  if (!req.body.email || !req.body.password)
    return res.status(400).send({ message: 'Email and password are required' })

  try {
    const user = await User.findOne({ where: { email: req.body.email } })
    if (!user) return res.status(404).send({ message: 'User not found' })
    const valid = await user.isValidPassword(req.body.password)
    if (!valid) return res.status(401).send({ message: 'Invalid password' })
    const token = await user.generateToken()
    res.status(200).json({ token })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  register,
  login,
}
