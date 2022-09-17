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
  beforeEach((done) => {
    chai
      .request(app)
      .post('/auth/login')
      .send(user)
      .end((err, res) => {
        token = res.body.token
        done()
      })
  })

  describe('POST /genres', () => {
    it('should create a new genre', (done) => {
      chai
        .request(app)
        .post('/genres')
        .set('Authorization', token)
        .field('name', 'testgenre')
        .end((err, res) => {
          expect(res).to.have.status(201)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.equal('Genre created successfully')
          done()
        })
    })
  })

  // get all genres
  describe('GET /genres', () => {
    it('should get all genres', (done) => {
      chai
        .request(app)
        .get('/genres')
        .set('Authorization', token)
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('array')
          expect(res.body.length).to.be.greaterThan(0)
          done()
        })
    })
  })

  describe('DELETE /genres/:id', () => {
    it('should delete a genre', (done) => {
      chai
        .request(app)
        .delete('/genres/1')
        .set('Authorization', token)
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.equal('Genre deleted successfully')
          done()
        })
    })
  })
})
