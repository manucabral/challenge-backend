/**
 * @file Contains movie controller
 */

const { Movie } = require('../models')

const getMovies = async (req, res) => {
  try {
    const movies = await Movie.findAll()
    if (movies.length == 0) res.status(404).json({ message: 'No movies found' })
    else res.json(movies)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

/**
 * Creates a new movie in the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const createMovie = async (req, res) => {
  const { title, image, releaseDate, qualification } = req.body
  try {
    const movie = await Movie.create({
      title,
      image,
      releaseDate,
      qualification,
    })
    res.status(201).json(movie)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  getMovies,
  createMovie,
}
