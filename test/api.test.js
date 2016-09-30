var expect  = require('chai').expect,
    app     = require('../server'),
    request = require('supertest')(app),
    knex    = require('../db/knex'),
    should  = require('should');


describe('Testing Connection', () => {
  before(done => {
    knex.migrate.latest()
      .then( () => {
        knex.seed.run()
          .then( () => {
            done();
          })
      })
  })

  after( done => {
    knex.migrate.rollback()
      .then( () => {
        done();
      })
  })

  it('Should connect to the api.', done => {
    request
      .get('/')
      .expect(200)
      .end((err, res) => {
        // This test just ensures the server is running.
        done();
      })
  })

  it('Should return seeded users.', done => {
    // According to the seed file, there should be 3 users.
    request
      .get('/api/users')
      .expect(200)
      .end((err, res) => {
        let users = res.body;
        expect(users.length).to.eq(3);
        done()
      })
  })

  it('Should return a specific user', done => {
    request
      .get('/api/users/1')
      .expect(200)
      .end((err, res) => {
        let user = res.body;
        expect(user).to.have.property('username')
        expect(user).to.have.property('full_name')
        expect(user).to.have.property('profile_url')
        expect(user).to.have.property('about_me');
        done();
      })
  })

  it('Should post a new user', done => {
    let data = {
      username:'Test',
      email:'testing@test.com',
      password:'test',
      about_me:'Im testing.',
      profile_url:'http://placecage.com/200/200',
      full_name:'Jessica Cage'
    }

    request
      .post('/api/users')
      .send(data)
      .expect(200)
      .end((err, res) => {
        request
          .get('/api/users')
          .expect(200)
          .end((err, res) => {
            let users = res.body;
            expect(users.length).to.eq(4);
            done();
          })
      })
  })
})
