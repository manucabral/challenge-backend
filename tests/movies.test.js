/**
 * @file Conatains movie routes tests.
 */

// required modules
const chai = require('chai')
const chaiHttp = require('chai-http')
const { expect } = chai

// required modules
const app = require('../src/server')
const fs = require('fs')
const { Movie } = require('../src/models')

// use chai-http
chai.use(chaiHttp)

// use a test user and movie
let token
const user = require('../data/users.json')
const movie = require('../data/movies.json')[0]

describe('MOVIES', () => {
  // get a valid token and creates a new genre for testing
  beforeEach(async () => {
    const res = await chai.request(app).post('/auth/login').send(user)
    token = res.body.token
    await chai
      .request(app)
      .post('/genres')
      .set('Authorization', token)
      .field('name', 'testgenre')
  })

  describe('POST /movies/new', async () => {
    it('should not access a non existent route', async () => {
      const res = await chai
        .request(app)
        .post('/movies/new')
        .set('Authorization', token)
      expect(res).to.have.status(404)
    })
  })

  describe('POST /movies', async () => {
    it('should not post a movie without a required field', async () => {
      const res = await chai
        .request(app)
        .post('/movies')
        .set('Authorization', token)
      expect(res).to.have.status(400)
      expect(res.body).to.be.an('object')
      expect(res.body).to.have.property('message')
      expect(res.body.message).to.equal('Missing required fields')
    })
    it('should create a new movie', async () => {
      const res = await chai
        .request(app)
        .post('/movies')
        .set('Authorization', token)
        .field('title', movie.title)
        .field('genreId', movie.genreId)
        .field('qualification', movie.qualification)
        .field('releaseDate', movie.releaseDate)
        .field('image', movie.image)
      expect(res).to.have.status(201)
      expect(res.body).to.be.an('object')
      expect(res.body).to.have.property('message')
      expect(res.body.message).to.equal('Movie created successfully')
    })
  })

  describe('GET /movies', async () => {
    it('should get all movies', async () => {
      const res = await chai
        .request(app)
        .get('/movies')
        .set('Authorization', token)
      expect(res).to.have.status(200)
      expect(res.body).to.be.an('array')
      expect(res.body).to.have.lengthOf(1)
    })
    it('should get a movie by title', async () => {
      const res = await chai
        .request(app)
        .get(`/movies?name=${movie.title}`)
        .set('Authorization', token)
      expect(res).to.have.status(200)
      expect(res.body).to.be.an('array')
      expect(res.body).to.have.lengthOf(1)
    })
    it('should get a movie by genre', async () => {
      const res = await chai
        .request(app)
        .get(`/movies?genre=${movie.genreId}`)
        .set('Authorization', token)
      expect(res).to.have.status(200)
      expect(res.body).to.be.an('array')
      expect(res.body).to.have.lengthOf(1)
    })
    it('should get a movie by order ASC', async () => {
      const res = await chai
        .request(app)
        .get('/movies?order=ASC')
        .set('Authorization', token)
      expect(res).to.have.status(200)
      expect(res.body).to.be.an('array')
      expect(res.body).to.have.lengthOf(1)
    })
    it('should get a movie by order DESC', async () => {
      const res = await chai
        .request(app)
        .get('/movies?order=DESC')
        .set('Authorization', token)
      expect(res).to.have.status(200)
      expect(res.body).to.be.an('array')
      expect(res.body).to.have.lengthOf(1)
    })
    it('should get a movie by order DESC and genre', async () => {
      const res = await chai
        .request(app)
        .get(`/movies?order=DESC&genre=${movie.genreId}`)
        .set('Authorization', token)
      expect(res).to.have.status(200)
      expect(res.body).to.be.an('array')
      expect(res.body).to.have.lengthOf(1)
    })
  })
  describe('GET /movies/category/fantasy', async () => {
    it('should not access a non existent route', async () => {
      const res = await chai
        .request(app)
        .get('/movies/category/fantasy')
        .set('Authorization', token)
      expect(res).to.have.status(404)
    })
  })

  describe('GET /movies/:id', async () => {
    it('should not get a movie with an invalid id', async () => {
      const res = await chai
        .request(app)
        .get('/movies/first')
        .set('Authorization', token)
      expect(res).to.have.status(500)
      expect(res.body).to.be.an('object')
      expect(res.body).to.have.property('error')
      expect(res.body.error).to.equal(
        'invalid input syntax for type integer: "first"'
      )
    })
    it('should not get a movie with a non existent id', async () => {
      const res = await chai
        .request(app)
        .get('/movies/99')
        .set('Authorization', token)
      expect(res).to.have.status(404)
      expect(res.body).to.be.an('object')
      expect(res.body).to.have.property('message')
      expect(res.body.message).to.equal('Movie not found')
    })
    it('should get a movie with a valid id', async () => {
      const res = await chai
        .request(app)
        .get('/movies/1')
        .set('Authorization', token)
      expect(res).to.have.status(200)
      expect(res.body).to.be.an('object')
      expect(res.body).to.have.property('id')
    })
  })
  describe('PUT /movies/:id', async () => {
    it('should not update a movie without a required field', async () => {
      const res = await chai
        .request(app)
        .put('/movies/1')
        .set('Authorization', token)
      expect(res).to.have.status(400)
      expect(res.body).to.be.an('object')
      expect(res.body).to.have.property('message')
      expect(res.body.message).to.equal('Missing required fields')
    })
    it('should not update a movie with an invalid id', async () => {
      const res = await chai
        .request(app)
        .put('/movies/first')
        .set('Authorization', token)
        .field('title', movie.title)
        .field('genreId', movie.genreId)
        .field('qualification', movie.qualification)
        .field('releaseDate', movie.releaseDate)
        .field('image', movie.image)
      expect(res).to.have.status(500)
      expect(res.body).to.be.an('object')
      expect(res.body).to.have.property('error')
      expect(res.body.error).to.equal(
        'invalid input syntax for type integer: "first"'
      )
    })
    it('should not update a movie with a non existent id', async () => {
      const res = await chai
        .request(app)
        .put('/movies/99')
        .set('Authorization', token)
        .field('title', movie.title)
        .field('genreId', movie.genreId)
        .field('qualification', movie.qualification)
        .field('releaseDate', movie.releaseDate)
        .field('image', movie.image)
      expect(res).to.have.status(404)
      expect(res.body).to.be.an('object')
      expect(res.body).to.have.property('message')
      expect(res.body.message).to.equal('Movie not found')
    })
    it('should update a movie with a valid id', async () => {
      const res = await chai
        .request(app)
        .put('/movies/1')
        .set('Authorization', token)
        .field('title', 'new super title')
        .field('genreId', movie.genreId)
        .field('qualification', movie.qualification)
        .field('releaseDate', movie.releaseDate)
        .attach(
          'image',
          fs.readFileSync('./public/images/default.png'),
          'default.png'
        )
      expect(res).to.have.status(200)
      expect(res.body).to.be.an('object')
      expect(res.body).to.have.property('message')
      expect(res.body.message).to.equal('Movie updated successfully')
      expect(res.body).to.have.property('movie')
      expect(res.body.movie).to.have.property('image')
      expect(res.body.movie.image).to.equal(
        'http://localhost:3000/images/default.png'
      )
    })
  })
  describe('DELETE /movies/:id', async () => {
    it('should not delete a movie with an invalid id', async () => {
      const res = await chai
        .request(app)
        .delete('/movies/first')
        .set('Authorization', token)
      expect(res).to.have.status(500)
      expect(res.body).to.be.an('object')
      expect(res.body).to.have.property('error')
      expect(res.body.error).to.equal(
        'invalid input syntax for type integer: "first"'
      )
    })
    it('should not delete a movie with a non existent id', async () => {
      const res = await chai
        .request(app)
        .delete('/movies/99')
        .set('Authorization', token)
      expect(res).to.have.status(404)
      expect(res.body).to.be.an('object')
      expect(res.body).to.have.property('message')
      expect(res.body.message).to.equal('Movie not found')
    })
    it('should delete a movie with a valid id', async () => {
      const res = await chai
        .request(app)
        .delete('/movies/1')
        .set('Authorization', token)
      expect(res).to.have.status(200)
      expect(res.body).to.be.an('object')
      expect(res.body).to.have.property('message')
      expect(res.body.message).to.equal('Movie deleted successfully')
    })
  })
})
