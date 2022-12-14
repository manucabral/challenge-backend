/**
 * @file Conatains auth routes tests.
 */

// required modules
const chai = require('chai')
const chaiHttp = require('chai-http')
const { expect } = chai

// required modules
const app = require('../src/server')
const { sequelize } = require('../src/database')

// use chai-http
chai.use(chaiHttp)

// require a test user
const user = require('../data/users.json')

describe('AUTH', () => {
  // force sync the database
  before((done) => {
    sequelize.sync({ force: true }).then(() => {
      done()
    })
  })

  describe('POST /auth/new/user', () => {
    it('should not access a non existent route', (done) => {
      chai
        .request(app)
        .post('/auth/new/register')
        .end((_, res) => {
          expect(res).to.have.status(404)
          done()
        })
    })
  })

  describe('POST /auth/register', () => {
    it('should not register a user without email and password', (done) => {
      chai
        .request(app)
        .post('/auth/register')
        .end((err, res) => {
          expect(res).to.have.status(400)
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.be.a('string')
          done()
        })
    })
    it('should register a user and returns a token', (done) => {
      chai
        .request(app)
        .post('/auth/register')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(201)
          expect(res.body).to.have.property('token')
          expect(res.body.token).to.be.a('string')
          done()
        })
    })
  })

  describe('POST /auth/login', () => {
    it('should login a user and returns a token', (done) => {
      chai
        .request(app)
        .post('/auth/login')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.have.property('token')
          expect(res.body.token).to.be.a('string')
          done()
        })
    })
  })
})
