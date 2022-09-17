/**
 * @file Conatains character routes tests.
 * Some tests need to be added, but for now, this is enough.
 */

// required modules
const chai = require('chai')
const chaiHttp = require('chai-http')
const { expect } = chai

// required modules
const app = require('../src/server')

// use chai-http
chai.use(chaiHttp)

// use a test user for generating a valid token
let token
const user = require('../data/users.json')

describe('CHARACTERS', () => {
  // get a valid token
  beforeEach(async () => {
    const res = await chai.request(app).post('/auth/login').send(user)
    token = res.body.token
  })

  describe('POST /characters/new', async () => {
    it('should not access a non existent route', async () => {
      const res = await chai
        .request(app)
        .post('/characters/new')
        .set('Authorization', token)
      expect(res).to.have.status(404)
    })
  })

  describe('POST /characters', async () => {
    it('should not post a character without a required field', async () => {
      const res = await chai
        .request(app)
        .post('/characters')
        .set('Authorization', token)
      expect(res).to.have.status(400)
      expect(res.body).to.be.an('object')
      expect(res.body).to.have.property('message')
      expect(res.body.message).to.equal('Missing fields')
    })
    it('should not post a character with an invalid movie id', async () => {
      const res = await chai
        .request(app)
        .post('/characters')
        .set('Authorization', token)
        .field('name', 'testcharacter')
        .field('weight', 100)
        .field('age', 20)
        .field('story', 'a super story')
        .field('movieId', 99)
      expect(res).to.have.status(404)
      expect(res.body).to.be.an('object')
      expect(res.body).to.have.property('message')
      expect(res.body.message).to.equal('Movie not found')
    })
  })
})
