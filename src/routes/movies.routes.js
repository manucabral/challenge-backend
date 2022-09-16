const { Router } = require('express')
const router = Router()

const {
  getMovies,
  getOneMovie,
  createMovie,
  updateMovie,
  deleteMovie,
} = require('../controllers/movie.controller')

// GET all movies
router.get('/', getMovies)

// GET one movie
router.get('/:id', getOneMovie)

// POST a new movie
router.post('/', createMovie)

// PUT update a movie (all fields)
router.put('/:id', updateMovie)

// DELETE a movie
router.delete('/:id', deleteMovie)

module.exports = router
