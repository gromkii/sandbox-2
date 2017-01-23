var expect  = require('chai').expect,
    app     = require('../server'),
    request = require('supertest')(app),
    knex    = require('../db/knex'),
    should  = require('should');

describe('API', () => {
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

  it('should connect to the api.', done => {
    request
      .get('/')
      .expect(200)
      .end((err, res) => {
        // This test just ensures the server is running.
        done();
      })
  })


  describe('Auth Routes', () => {
    it('should login with correct credentials', done => {
      let data = {
        username:'met2002',
        password:'test'
      };

      request
        .post('/auth/login')
        .send(data)
        .expect(200)
        .end( (err, res) => {
          let data = res.body.message;

          expect(data).to.eq('Did the thing.');
          done();
        });

    });

    it('should redirect to /fail if incorrect credentials', done => {
      let data = {
        username:'Nick',
        password:'Cage'
      };

      request
        .post('/auth/login')
        .send(data)
        .expect(302)
        .end((err, res) => {
          let data = res.header;

          expect(data.location).to.eq('/auth/fail');
          done();
        });
    });

    it('should send error message if incorrect credentials', done => {
      let data = {
        username:'Nick',
        password:'Cage'
      };

      request
        .post('/auth/login')
        .send(data)
        .expect(302)
        .end((err, res) => {
          request
            .get(res.header.location) //Should be 'fail' from previous test!
            .expect(200)
            .end((err, res) => {
              let data = res.body;

              expect(data.error).to.eq('Something went wrong.');
              done();
            })
        });
    });
  });

  describe('User Routes', () => {
    it('should return seeded users.', done => {
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

    it('should return a specific user', done => {
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

    it('should post a new user', done => {
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
        });
    });

    it('should update user information', done => {
      let data = {
        full_name:'Nick Cage'
      };

      request
        .put('/api/users/1')
        .send(data)
        .expect(200)
        .end((err, res) => {
          let user = res.body.user;

          expect(user.full_name).to.eq('Nick Cage');
          done();
        });
    });
  });
});
