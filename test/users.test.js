import axios from 'axios'
import chai from 'chai'

var newUserID;
const userID = 0;
const userPW = 'password527'
const newUser = {
  first_name: 'TEST',
  last_name: 'TEST',
  email: 'test@example.com',
  username: 'test123',
  password: '$2a$10$fmF.iYGBOD.Y1riR6nlhLuvzAa7Tj1YZBTaaPDZImDLRlEjSYk1rm',
}
const updatedUser = {
  first_name: 'UPDATED_FIRST_NAME',
  last_name: 'UPDATED_LAST_NAME',
  email: 'updated@example.com',
  username: "UPDATED_USER_NAME"
}

describe("The Server's /users route", () => {
  it('returns 200', () => {
    axios.get('http://127.0.0.1:3030/users')
      .then((res) => chai.expect(res.status).to.equal(200))
  });

  it('returns a data object', () => {
    axios.get('http://127.0.0.1:3030/users')
      .then((res) => {
        chai.expect(res.status).to.equal(200);
        chai.expect(res.hasOwnProperty('data')).to.be.true;
        chai.expect(res.data).to.be.an('object');
      })
  })

  it('returns a data object with an array', () => {
    axios.get('http://127.0.0.1:3030/users')
      .then((res) => {
        chai.expect(res.status).to.equal(200);
        chai.expect(res.hasOwnProperty('data')).to.be.true;
        chai.expect(res.data).to.be.an('object');
        chai.expect(res.data.hasOwnProperty('users')).to.be.true;
        chai.expect(res.data.users).to.be.an('array');
      })
  })
});

describe("The Server's /users/id/0 route", () => {
  it('returns 200', () => {
    axios.get('http://127.0.0.1:3030/users/id/'+userID)
      .then((res) => chai.expect(res.status).to.equal(200))
  });


  it('returns a data object', () => {
    axios.get('http://127.0.0.1:3030/users/id/'+userID)
      .then((res) => {
        chai.expect(res.status).to.equal(200);
        chai.expect(res.hasOwnProperty('data')).to.be.true;
        chai.expect(res.data).to.be.an('object');
      })
  });


  it('returns a data object with correct user property names', () => {
    axios.get('http://127.0.0.1:3030/users/id/'+userID)
      .then((res) => {
        chai.expect(res.status).to.equal(200);
        chai.expect(res.hasOwnProperty('data')).to.be.true;
        chai.expect(res.data).to.be.an('object');
        chai.expect(res.data.hasOwnProperty('id')).to.be.true;
        chai.expect(res.data.hasOwnProperty('first_name')).to.be.true;
        chai.expect(res.data.hasOwnProperty('last_name')).to.be.true;
        chai.expect(res.data.hasOwnProperty('username')).to.be.true;
        chai.expect(res.data.hasOwnProperty('password')).to.be.true;
        chai.expect(res.data.hasOwnProperty('createdAt')).to.be.true;
        chai.expect(res.data.hasOwnProperty('updatedAt')).to.be.true;
      })
  });


  it('returns a data object with correct user property types', () => {
    axios.get('http://127.0.0.1:3030/users/id/'+userID)
      .then((res) => {
        chai.expect(res.status).to.equal(200);
        chai.expect(res.hasOwnProperty('data')).to.be.true;
        chai.expect(res.data).to.be.an('object');
        chai.expect(res.data.hasOwnProperty('id')).to.be.true;
        chai.expect(res.data.hasOwnProperty('first_name')).to.be.true;
        chai.expect(res.data.hasOwnProperty('last_name')).to.be.true;
        chai.expect(res.data.hasOwnProperty('username')).to.be.true;
        chai.expect(res.data.hasOwnProperty('password')).to.be.true;
        chai.expect(res.data.hasOwnProperty('createdAt')).to.be.true;
        chai.expect(res.data.hasOwnProperty('updatedAt')).to.be.true;
        chai.expect(res.data.id).to.be.an('number');
        chai.expect(res.data.first_name).to.be.an('string');
        chai.expect(res.data.last_name).to.be.an('string');
        chai.expect(res.data.username).to.be.an('string');
        chai.expect(res.data.password).to.be.an('string');
        chai.expect(res.data.createdAt).to.be.an('string');
        chai.expect(res.data.updatedAt).to.be.an('string');
      })
  });

  it('returns a data object with a matching user id', () => {
    axios.get('http://127.0.0.1:3030/users/id/'+userID)
      .then((res) => {
        chai.expect(res.status).to.equal(200);
        chai.expect(res.hasOwnProperty('data')).to.be.true;
        chai.expect(res.data).to.be.an('object');
        chai.expect(res.data.hasOwnProperty('id')).to.be.true;
        chai.expect(res.data.id).to.be.an('number');
        chai.expect(res.data.id).to.equal(userID);
      })
  });


});

describe("The Server's /users/create route", () => {
  it('returns 200 and { created: true, user_id: <id> }', done => {

    axios.post('http://127.0.0.1:3030/users/create', newUser)
      .then((res) => {
        chai.expect(res.status).to.equal(200);
        chai.expect(res.hasOwnProperty('data')).to.be.true;
        chai.expect(res.data).to.be.an('object');
        chai.expect(res.data.created).to.be.true;
        chai.expect(res.data.user_id).to.be.a("number");
        newUserID = res.data.user_id;
        done();
      })

  });
});


describe("The Server's /users/create route", () => {
  it('returns 200 and { created: false }', done => {

    axios.post('http://127.0.0.1:3030/users/create', newUser)
      .then((res) => {
        chai.expect(res.status).to.equal(200);
        chai.expect(res.hasOwnProperty('data')).to.be.true;
        chai.expect(res.data).to.be.an('object');
        chai.expect(res.data.created).to.be.false;
        done();
      })

  });
});



describe("The Server's /users/auth route", () => {

  it('returns 200', done => {
    axios.post('http://127.0.0.1:3030/users/auth', { username: newUser.username, password: userPW }).then((res) => {
      chai.expect(res.status).to.equal(200);
      done();
    })
  });

  it('returns a data object', done => {
    axios.post('http://127.0.0.1:3030/users/auth', { username: newUser.username, password: userPW }).then((res) => {
      chai.expect(res.status).to.equal(200);
      chai.expect(res.hasOwnProperty('data')).to.be.true;
      chai.expect(res.data).to.be.an('object');
      done();
    })
  });


  it('returns a data object with correct user property names', done => {
    axios.post('http://127.0.0.1:3030/users/auth', { username: newUser.username, password: userPW }).then((res) => {
      chai.expect(res.status).to.equal(200);
      chai.expect(res.hasOwnProperty('data')).to.be.true;
      chai.expect(res.data).to.be.an('object');
      chai.expect(res.data.hasOwnProperty('id')).to.be.true;
      chai.expect(res.data.hasOwnProperty('first_name')).to.be.true;
      chai.expect(res.data.hasOwnProperty('last_name')).to.be.true;
      chai.expect(res.data.hasOwnProperty('username')).to.be.true;
      chai.expect(res.data.hasOwnProperty('password')).to.be.true;
      chai.expect(res.data.hasOwnProperty('createdAt')).to.be.true;
      chai.expect(res.data.hasOwnProperty('updatedAt')).to.be.true;
      done();
    })
  });


  it('returns a data object with correct user property types', done => {
    axios.post('http://127.0.0.1:3030/users/auth', { username: newUser.username, password: userPW }).then((res) => {
      chai.expect(res.status).to.equal(200);
      chai.expect(res.hasOwnProperty('data')).to.be.true;
      chai.expect(res.data).to.be.an('object');
      chai.expect(res.data.hasOwnProperty('id')).to.be.true;
      chai.expect(res.data.hasOwnProperty('first_name')).to.be.true;
      chai.expect(res.data.hasOwnProperty('last_name')).to.be.true;
      chai.expect(res.data.hasOwnProperty('username')).to.be.true;
      chai.expect(res.data.hasOwnProperty('password')).to.be.true;
      chai.expect(res.data.hasOwnProperty('createdAt')).to.be.true;
      chai.expect(res.data.hasOwnProperty('updatedAt')).to.be.true;
      chai.expect(res.data.id).to.be.an('number');
      chai.expect(res.data.first_name).to.be.an('string');
      chai.expect(res.data.last_name).to.be.an('string');
      chai.expect(res.data.username).to.be.an('string');
      chai.expect(res.data.password).to.be.an('string');
      chai.expect(res.data.createdAt).to.be.an('string');
      chai.expect(res.data.updatedAt).to.be.an('string');
      done();
    })
  });


  it('returns a data object with matching user property values', done => {
    axios.post('http://127.0.0.1:3030/users/auth', { username: newUser.username, password: userPW }).then((res) => {
      chai.expect(res.status).to.equal(200);
      chai.expect(res.hasOwnProperty('data')).to.be.true;
      chai.expect(res.data).to.be.an('object');
      chai.expect(res.data.hasOwnProperty('id')).to.be.true;
      chai.expect(res.data.hasOwnProperty('first_name')).to.be.true;
      chai.expect(res.data.hasOwnProperty('last_name')).to.be.true;
      chai.expect(res.data.hasOwnProperty('username')).to.be.true;
      chai.expect(res.data.hasOwnProperty('password')).to.be.true;
      chai.expect(res.data.hasOwnProperty('createdAt')).to.be.true;
      chai.expect(res.data.hasOwnProperty('updatedAt')).to.be.true;
      chai.expect(res.data.id).to.be.an('number');
      chai.expect(res.data.first_name).to.be.an('string');
      chai.expect(res.data.last_name).to.be.an('string');
      chai.expect(res.data.username).to.be.an('string');
      chai.expect(res.data.password).to.be.an('string');
      chai.expect(res.data.createdAt).to.be.an('string');
      chai.expect(res.data.updatedAt).to.be.an('string');
      chai.expect(res.data.id).to.equal(newUserID);
      chai.expect(res.data.first_name).to.equal(newUser.first_name);
      chai.expect(res.data.last_name).to.equal(newUser.last_name);
      chai.expect(res.data.username).to.equal(newUser.username);
      chai.expect(res.data.password).to.equal(newUser.password);
      // chai.expect(res.data.createdAt).to.equal(newUser.createdAt);
      // chai.expect(res.data.updatedAt).to.equal(newUser.updatedAt);
      done();
    })
  });

});


describe("The Server's /users/update route", () => {
  it('returns 200', done => {

    axios.post('http://127.0.0.1:3030/users/update/' + newUserID, updatedUser)
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
      chai.expect(res.data.first_name).to.be.an('string');
      chai.expect(res.data.first_name).to.equal(updatedUser.first_name);
      chai.expect(res.data.last_name).to.be.an('string');
      chai.expect(res.data.last_name).to.equal(updatedUser.last_name);
      chai.expect(res.data.email).to.be.an('string');
      chai.expect(res.data.email).to.equal(updatedUser.email);
      chai.expect(res.data.username).to.be.an('string');
      chai.expect(res.data.username).to.equal(updatedUser.username);
      done();
    })

  })
});




describe("The Server's /users/destroy route", () => {
  it('returns 200', done => {

    axios.post('http://127.0.0.1:3030/users/destroy', { user_id: newUserID })
      .then((res) => {
        chai.expect(res.status).to.equal(200);
        chai.expect(res.data).to.be.an('number');
        chai.expect(res.data).to.equal(1);
        done();
      })

  });
});
