/**
 * @file Contains the genre routes.
 */

// required modules
const { Router } = require('express')
const router = Router()
const {
  getGenres,
  createGenre,
  deleteGenre,
} = require('../controllers/genre.controller')

// GET all genres
router.get('/', getGenres)

// POST create a new genre
router.post('/', createGenre)

// DELETE a genre
router.delete('/:id', deleteGenre)

module.exports = router
