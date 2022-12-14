/**
 * @file Contains character controller
 */

// required modules
const { Op } = require('sequelize')
const { Character, Movie } = require('../models')
const { uploadImage } = require('../utils/files')

/**
 * Get all characters from the database.
 * @param {Object} _ - Request object.
 * @param {Object} res - Response object.
 */
const getCharacters = async (req, res) => {
  if (Object.keys(req.query).length > 0) return filterCharacters(req, res)
  try {
    const characters = await Character.findAll({ fields: ['image', 'name'] })
    if (characters.length == 0)
      res.status(404).json({ message: 'No characters found' })
    else res.json(characters)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

/**
 * Get one character from the database.
 * @param {Object} req - Request object.
 * @param {Object} res - Response object.
 */
const getOneCharacter = async (req, res) => {
  try {
    const character = await Character.findOne({
      where: { id: req.params.id },
      include: { model: Movie },
    })
    if (!character) res.status(404).json({ message: 'Character not found' })
    else res.json(character)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

/**
 * Create a new character in the database.
 * @param {Object} req - Request object.
 * @param {Object} res - Response object.
 */
const createCharacter = async (req, res) => {
  const { name, age, weight, story, movieId } = req.body

  if (!name || !age || !weight || !story || !movieId)
    return res.status(400).json({ message: 'Missing fields' })

  const movie = await Movie.findOne({ where: { id: movieId } })
  if (!movie) return res.status(404).json({ message: 'Movie not found' })

  try {
    const image_url = await uploadImage(req.files)
    const newCharacter = await Character.create({
      name,
      image: image_url,
      age,
      weight,
      story,
    })
    await newCharacter.addMovie([movie])
    await movie.addCharacter([newCharacter])
    res.json(newCharacter)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

/**
 * Updates a character in the database.
 * @param {Object} req - Request object.
 * @param {Object} res - Response object.
 */
const updateCharacter = async (req, res) => {
  const { name, age, weight, story, movieId } = req.body

  if (!name || !age || !weight || !story || !movieId)
    return res.status(400).json({ message: 'Missing fields' })

  const movie = await Movie.findOne({ where: { id: movieId } })
  if (!movie) return res.status(404).json({ message: 'Movie not found' })

  try {
    const character = await Character.findOne({ where: { id: req.params.id } })
    if (!character)
      return res.status(404).json({ message: 'Character not found' })
    const image_url = req.files ? await uploadImage(req.files) : character.image
    await character.update({ name, image: image_url, age, weight, story })
    await character.setMovies([movie])
    res.json({ message: 'Character updated successfully', character })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

/**
 * Deletes a character from the database.
 * @param {Object} req - Request object.
 * @param {Object} res - Response object.
 */
const deleteCharacter = async (req, res) => {
  const { id } = req.params
  if (isNaN(parseInt(id)))
    res.status(400).json({ message: 'Id must be a number' })
  try {
    const character = await Character.destroy({ where: { id } })
    if (!character) res.status(404).json({ message: 'Character not found' })
    else res.status(200).json({ message: 'Character deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

/**
 * Filter characters from the database, based on the query parameters.
 * @param {Object} req - Request object.
 * @param {*} res - Response object.
 */
const filterCharacters = async (req, res) => {
  const availableFilters = ['name', 'age', 'movie']
  const filterField = Object.keys(req.query)[0]
  const value = req.query[filterField]

  if (!availableFilters.includes(filterField))
    return res.status(400).json({ message: 'Invalid filter' })

  const options = {
    where: {},
    include: { model: Movie },
  }
  if (filterField === 'name') options.where.name = { [Op.iLike]: `%${value}%` }
  if (filterField === 'age') options.where.age = { [Op.eq]: value }
  if (filterField === 'movie') options.include.where = { id: value }
  try {
    const characters = await Character.findAll(options)
    if (characters.length == 0)
      res.status(404).json({ message: 'No characters found' })
    else res.json(characters)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  getCharacters,
  getOneCharacter,
  createCharacter,
  updateCharacter,
  deleteCharacter,
  filterCharacters,
}
