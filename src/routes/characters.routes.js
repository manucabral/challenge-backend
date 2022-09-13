/**
 * @file Contains all characters routes.
 */

// required modules
const {
  getCharacters,
  createCharacter,
  updateCharacter,
  deleteCharacter,
  getOneCharacter,
} = require('../controllers/character.controller')
const { Router } = require('express')
const router = Router()

// GET all characters
router.get('/', getCharacters)

// GET one character
router.get('/:id', getOneCharacter)

// POST create a character
router.post('/', createCharacter)

// PUT modify a character (all character fields)
router.put('/:id', updateCharacter)

// DELETE one character
router.delete('/:id', deleteCharacter)

module.exports = router
