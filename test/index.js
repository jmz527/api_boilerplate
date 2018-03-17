import http from 'http'
import axios from 'axios'
import chai from 'chai'

const newUser = {
  first_name: 'TEST',
  last_name: 'TEST',
  email: 'test@example.com',
  username: 'test123',
  password: '$2a$10$fmF.iYGBOD.Y1riR6nlhLuvzAa7Tj1YZBTaaPDZImDLRlEjSYk1rm',
}

var newUserID;

describe("The Server's / route", () => {
  it('should return 200', done => {
    http.get('http://127.0.0.1:3030', res => { // console.log('statusCode', res.statusCode)
      chai.expect(res.statusCode).to.equal(200);
      done();
    });
  });
});


describe("The Server's /users route", () => {
  it('should return 200', done => {
    http.get('http://127.0.0.1:3030', res => { // console.log('statusCode', res.statusCode)
      chai.expect(res.statusCode).to.equal(200);
      done();
    });
  });

  it('should return an array of users', () => {
    axios.get('http://127.0.0.1:3030/users')
      .then((res) => {
        chai.expect(res.data).to.be.an('object');
        chai.expect(res.data.users).to.be.an('array');
      })
  });
});

describe("The Server's /users/id/0 route", () => {
  it('should return 200', done => {
    http.get('http://127.0.0.1:3030/users/id/0', res => { // console.log('statusCode', res.statusCode)
      chai.expect(res.statusCode).to.equal(200);
      done();
    });
  });

  const userID = 0;

  it('should return a user', () => {
    axios.get('http://127.0.0.1:3030/users/id/'+userID)
      .then((res) => {
        chai.expect(res.data).to.be.an('object');
        chai.expect(res.data.id).to.be.an('number');
        chai.expect(res.data.id).to.equal(userID);
        chai.expect(res.data.first_name).to.be.an('string');
        chai.expect(res.data.last_name).to.be.an('string');
        chai.expect(res.data.username).to.be.an('string');
        chai.expect(res.data.password).to.be.an('string');
        chai.expect(res.data.createdAt).to.be.an('string');
        chai.expect(res.data.updatedAt).to.be.an('string');
      })
  });

});

describe("The Server's /users/create route", () => {
  it('should return 200 and { created: true, user_id: <id> }', done => {

    axios.post('http://127.0.0.1:3030/users/create', newUser)
      .then((res) => {
        chai.expect(res.status).to.equal(200);
        chai.expect(res.data).to.be.an('object');
        chai.expect(res.data.created).to.be.true;
        chai.expect(res.data.user_id).to.be.a("number");
        newUserID = res.data.user_id;
        done();
      })

  });
});


describe("The Server's /users/create route", () => {
  it('should return 200 and { created: false }', done => {

    axios.post('http://127.0.0.1:3030/users/create', newUser)
      .then((res) => {
        chai.expect(res.status).to.equal(200);
        chai.expect(res.data).to.be.an('object');
        chai.expect(res.data.created).to.be.false;
        done();
      })

  });
});



describe("The Server's /users/auth route", () => {
  it('should return 200', done => {

    axios.post('http://127.0.0.1:3030/users/auth', {
      username: newUser.username,
      password: 'password527'
    }).then((res) => {
      chai.expect(res.status).to.equal(200);
      chai.expect(res.data).to.be.an('object');
      chai.expect(res.data.id).to.be.an('number');
      chai.expect(res.data.id).to.equal(newUserID);
      chai.expect(res.data.first_name).to.be.an('string');
      chai.expect(res.data.first_name).to.equal(newUser.first_name);
      chai.expect(res.data.last_name).to.be.an('string');
      chai.expect(res.data.last_name).to.equal(newUser.last_name);
      chai.expect(res.data.username).to.be.an('string');
      chai.expect(res.data.username).to.equal(newUser.username);
      chai.expect(res.data.password).to.be.an('string');
      chai.expect(res.data.password).to.equal(newUser.password);

      chai.expect(res.data.createdAt).to.be.an('string');
      // chai.expect(res.data.createdAt).to.equal(newUser.createdAt);
      chai.expect(res.data.updatedAt).to.be.an('string');
      // chai.expect(res.data.updatedAt).to.equal(newUser.updatedAt);
      done();
    })

  });
});


describe("The Server's /users/update route", () => {
  it('should return 200', done => {

    axios.post('http://127.0.0.1:3030/users/update/' + newUserID, { username: "UPDATED_USER_NAME" })
      .then((res) => {
        chai.expect(res.status).to.equal(200);
        done();
      })
  });

  it('updated the user properly', done => {

    axios.get('http://127.0.0.1:3030/users/id/' + newUserID).then((res) => { // console.log('status', res.status)
      chai.expect(res.status).to.equal(200);
      chai.expect(res.data.id).to.be.an('number');
      chai.expect(res.data.id).to.equal(newUserID);
      chai.expect(res.data.username).to.be.an('string');
      chai.expect(res.data.username).to.equal('UPDATED_USER_NAME');
      done();
    })

  })
});




describe("The Server's /users/destroy route", () => {
  it('should return 200', done => {

    axios.post('http://127.0.0.1:3030/users/destroy', { user_id: newUserID })
      .then((res) => {
        chai.expect(res.status).to.equal(200);
        chai.expect(res.data).to.be.an('number');
        chai.expect(res.data).to.equal(1);
        done();
      })

  });
});
