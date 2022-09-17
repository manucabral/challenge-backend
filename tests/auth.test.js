/**
 * @file Conatains auth routes tests.
 */

// required modules
const chai = require('chai')
const chaiHttp = require('chai-http')
const { expect } = chai

// required modules
const app = require('../src/server')
const { User } = require('../src/models')

// use chai-http
chai.use(chaiHttp)

describe('AUTH', () => {
  describe('POST /auth/login', () => {
    it('should login a user and returns a token', (done) => {
      const data = {
        email: 'test@gmail.com',
        password: 'wowsuperpass',
      }
      before(async () => {
        await User.create(data)
      })
      chai
        .request(app)
        .post('/auth/login')
        .send(data)
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.have.property('token')
          expect(res.body.token).to.be.a('string')
          done()
        })
    })
  })
  describe('POST /auth/register', () => {
    it('should register a user and returns a token', (done) => {
      after(async () => {
        await User.destroy({ where: { email: 'newuser@hotmail.com' } })
      })
      const data = {
        email: 'newuser@hotmail.com',
        password: 'anicepassword',
      }
      chai
        .request(app)
        .post('/auth/register')
        .send(data)
        .end((err, res) => {
          expect(res).to.have.status(201)
          expect(res.body).to.have.property('token')
          expect(res.body.token).to.be.a('string')
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
  })
})
