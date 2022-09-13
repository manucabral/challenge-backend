const { Router } = require('express')
const router = Router()

const { getMovies, createMovie } = require('../controllers/movie.controller')

router.get('/', getMovies)
router.post('/', createMovie)

module.exports = router
