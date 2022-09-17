/**
 * @file Contains movie controller
 */

// require modules
const { Op } = require('sequelize')
const { Movie, Character, Genre } = require('../models')
const { uploadImage } = require('../utils/files')

/**
 * Get all movies from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getMovies = async (req, res) => {
  if (Object.keys(req.query).length > 0) return filterMovies(req, res)
  try {
    const movies = await Movie.findAll({
      include: {
        model: Genre,
      },
    })
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
  const { title, releaseDate, qualification, genreId } = req.body
  if (!title || !qualification || !genreId)
    return res.status(400).json({ message: 'Missing required fields' })
  try {
    const genre = await Genre.findOne({ where: { id: genreId } })
    if (!genre) return res.status(404).json({ message: 'Genre not found' })
    const image_url = await uploadImage(req.files)
    const movie = await Movie.create({
      title,
      image: image_url,
      releaseDate,
      qualification,
    })
    await genre.addMovie([movie])
    res.status(201).json({ message: 'Movie created successfully', movie })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

/**
 * Get one movie from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getOneMovie = async (req, res) => {
  try {
    const movie = await Movie.findOne({
      where: { id: req.params.id },
      include: {
        model: Character,
        attributes: ['image', 'name'],
      },
    })
    if (!movie) res.status(404).json({ message: 'Movie not found' })
    else res.json(movie)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

/**
 * Update a movie in the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const updateMovie = async (req, res) => {
  const { title, releaseDate, qualification, genreId } = req.body
  if (!title || !qualification)
    return res.status(400).json({ message: 'Missing required fields' })
  try {
    const movie = await Movie.findOne({ where: { id: req.params.id } })
    if (!movie) return res.status(404).json({ message: 'Movie not found' })
    const genre = await Genre.findOne({
      where: { id: genreId || movie.genreId },
    })
    if (!genre) return res.status(404).json({ message: 'Genre not found' })

    const image_url = req.files.image
      ? await uploadImage(req.files)
      : movie.image
    await movie.update({ title, image: image_url, releaseDate, qualification })
    await genre.addMovie([movie])
    res.json({ message: 'Movie updated successfully', movie })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findOne({ where: { id: req.params.id } })
    if (!movie) return res.status(404).json({ message: 'Movie not found' })
    await movie.destroy()
    res.json({ message: 'Movie deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const filterMovies = async (req, res) => {
  const availableFilters = ['name', 'genre', 'order']
  const filterFields = Object.keys(req.query)[0]
  const value = req.query[filterFields]

  if (!availableFilters.includes(filterFields))
    return res.status(400).json({ message: 'Invalid filter' })

  const options = {
    where: {},
    include: {
      model: Genre,
    },
  }
  if (filterFields === 'name') options.where.title = { [Op.like]: `%${value}%` }
  if (filterFields === 'genre') options.where.genreId = value
  if (filterFields === 'order') options.order = [['releaseDate', value]]
  try {
    const movies = await Movie.findAll(options)
    if (movies.length == 0) res.status(404).json({ message: 'No movies found' })
    else res.json(movies)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  getMovies,
  getOneMovie,
  createMovie,
  updateMovie,
  deleteMovie,
}
