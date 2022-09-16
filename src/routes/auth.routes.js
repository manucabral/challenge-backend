/**
 * @file Contains the auth routes.
 */

// required modules
const { Router } = require('express')
const router = Router()
const { register, login } = require('../controllers/auth.controller')

// POST register
router.post('/register', register)

// POST login
router.post('/login', login)

module.exports = router
