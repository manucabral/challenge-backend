/**
 * @file Conatains genre routes tests.
 */

// required modules
const chai = require('chai')
const chaiHttp = require('chai-http')
const { expect } = chai

// required modules
const app = require('../src/server')

// use chai-http
chai.use(chaiHttp)

// require a test user for generating a valid token
let token
const user = require('../data/users.json')

describe('GENRE', () => {
  // get a valid token
  beforeEach(async () => {
    const res = await chai.request(app).post('/auth/login').send(user)
    token = res.body.token
  })

  describe('POST /genres/new', () => {
    it('should not access a non existent route', async () => {
      const res = await chai
        .request(app)
        .post('/genres/new')
        .set('Authorization', token)
      expect(res).to.have.status(404)
    })
  })

  describe('POST /genres', () => {
    it('should not post a genre without a name', async () => {
      const res = await chai
        .request(app)
        .post('/genres')
        .set('Authorization', token)
      expect(res).to.have.status(400)
      expect(res.body).to.be.an('object')
      expect(res.body).to.have.property('message')
      expect(res.body.message).to.equal('Missing required fields')
    })
    it('should create a new genre', async () => {
      const res = await chai
        .request(app)
        .post('/genres')
        .set('Authorization', token)
        .field('name', 'testgenre')
      expect(res).to.have.status(201)
      expect(res.body).to.be.an('object')
      expect(res.body).to.have.property('message')
      expect(res.body.message).to.equal('Genre created successfully')
    })
  })

  // get all genres
  describe('GET /genres', () => {
    it('should get all genres', async () => {
      const res = await chai
        .request(app)
        .get('/genres')
        .set('Authorization', token)
      expect(res).to.have.status(200)
      expect(res.body).to.be.an('array')
      expect(res.body.length).to.be.greaterThan(0)
    })
  })

  describe('DELETE /genres/:id', () => {
    it('should delete a genre', async () => {
      const res = await chai
        .request(app)
        .delete('/genres/1')
        .set('Authorization', token)
      expect(res).to.have.status(200)
      expect(res.body).to.be.an('object')
      expect(res.body).to.have.property('message')
      expect(res.body.message).to.equal('Genre deleted successfully')
    })
  })
})
