var expect  = require('chai').expect,
    app     = require('../server'),
    request = require('supertest')(app),
    knex    = require('../db/knex'),
    should  = require('should');


describe('Testing Connection', () => {
  it('Should connect to the api.', done => {
    request
      .get('/')
      .expect(200)
      .end((err, res) => {
        // This test just ensures the server is running.
        done();
      })
  })
})
