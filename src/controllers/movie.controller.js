/**
 * @file Contains movie controller
 */

const { Movie } = require('../models')
const { uploadImage } = require('../utils/files')

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
  const { title, releaseDate, qualification } = req.body
  if (!title || !qualification)
    return res.status(400).json({ message: 'Missing required fields' })
  try {
    const image_url = await uploadImage(req.files)
    const movie = await Movie.create({
      title,
      image: image_url,
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
