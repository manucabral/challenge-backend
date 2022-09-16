/**
 * @file Conatains genres controller
 */

// require modules
const { Genre } = require('../models')
const { uploadImage } = require('../utils/files')

/**
 * Get all genres from the database.
 * @param {Object} _ - The request object. Not used.
 * @param {Object} res - The response object.
 */
const getGenres = async (_, res) => {
  try {
    const genres = await Genre.findAll()
    if (genres.length == 0) res.status(404).json({ message: 'No genres found' })
    else res.json(genres)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

/**
 * Creates a new genre in the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const createGenre = async (req, res) => {
  const { name } = req.body
  if (!name) return res.status(400).json({ message: 'Missing required fields' })
  try {
    const image_url = await uploadImage(req.files)
    const genre = await Genre.create({ name, image: image_url })
    res.status(201).json({ message: 'Genre created successfully', genre })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

/**
 * Deletes a genre from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const deleteGenre = async (req, res) => {
  const { id } = req.params
  try {
    const genre = await Genre.findOne({ where: { id } })
    if (!genre) return res.status(404).json({ message: 'Genre not found' })
    await genre.destroy()
    res.json({ message: 'Genre deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  getGenres,
  createGenre,
  deleteGenre,
}
