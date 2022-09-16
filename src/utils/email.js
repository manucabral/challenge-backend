/**
 * @file Contains email utils.
 */

const sendGrid = require('@sendgrid/mail')
const { EMAIL } = require('../config')

/**
 * Sends an email.
 * @param {string} to - The email address to send the email to.
 * @param {string} subject - The subject of the email.
 * @param {string} html - The html content of the email.
 * @returns {Promise} A promise that resolves when the email is sent.
 * @throws {Error} An error if the email fails to send.
 */
const sendEmail = async (to, subject, html) => {
  sendGrid.setApiKey(EMAIL.API_KEY)
  const message = {
    to,
    from: EMAIL.FROM,
    subject,
    html,
  }
  try {
    await sendGrid.send(message)
    console.log(`Email sent to ${to}`)
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * Sends a welcome email.
 * @param {String} emai - The email address dest.
 * @param {String} name - The name of the user or the email address.
 */
const sendWelcomeEmail = async (options) => {
  const { email, name } = options
  const subject = 'Welcome to the Disney API'
  const html = `
        <h1>Welcome to the Disney API, ${name}!</h1>
        <p>Thank you for joining us. Still in development.</p>
        <p>We hope you enjoy your stay.</p>
    `
  await sendEmail(email, subject, html)
}

/**
 * Checks if can send a email.
 * @returns {Boolean} True if api key and email from is provided.
 */
const canSendEmail = () => EMAIL.API_KEY && EMAIL.FROM

module.exports = {
  sendEmail,
  sendWelcomeEmail,
  canSendEmail,
}
