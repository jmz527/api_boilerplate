import axios from 'axios';
import chai from 'chai';

var newUserID;
const userID = 0;
const userPW = 'password527';
const newUser = {
  first_name: 'TEST',
  last_name: 'TEST_0000',
  email: 'test0000@example.com',
  username: 'test1234',
  password: '$2a$10$fmF.iYGBOD.Y1riR6nlhLuvzAa7Tj1YZBTaaPDZImDLRlEjSYk1rm',
};
const updatedUser = {
  first_name: 'UPDATED_FIRST_NAME',
  last_name: 'UPDATED_LAST_NAME',
  email: 'updated@example.com',
  username: "UPDATED_USER_NAME"
};

describe("The Server's /users route", () => {
  it('returns 200', done => {
    axios.get('http://127.0.0.1:8000/api/users')
      .then((res) => chai.expect(res.status).to.equal(200));
    done();
  });

  it('returns a data object', done => {
    axios.get('http://127.0.0.1:8000/api/users')
      .then((res) => {
        chai.expect(res.status).to.equal(200);
        chai.expect(res.hasOwnProperty('data')).to.be.true;
        chai.expect(res.data).to.be.an('object');
        done();
      });
  });

  it('returns a data object with an array', done => {
    axios.get('http://127.0.0.1:8000/api/users')
      .then((res) => {
        chai.expect(res.status).to.equal(200);
        chai.expect(res.hasOwnProperty('data')).to.be.true;
        chai.expect(res.data).to.be.an('object');
        chai.expect(res.data.hasOwnProperty('users')).to.be.true;
        chai.expect(res.data.users).to.be.an('array');
        done();
      });
  });
});

describe("The Server's /users/id/0 route", () => {
  it('returns 200', done => {
    axios.get('http://127.0.0.1:8000/api/users/id/'+userID)
      .then((res) => chai.expect(res.status).to.equal(200));
    done();
  });


  it('returns a data object', done => {
    axios.get('http://127.0.0.1:8000/api/users/id/'+userID)
      .then((res) => {
        chai.expect(res.status).to.equal(200);
        chai.expect(res.hasOwnProperty('data')).to.be.true;
        chai.expect(res.data).to.be.an('object');
        done();
      });
  });


  it('returns a data object with correct user property names', done => {
    axios.get('http://127.0.0.1:8000/api/users/id/'+userID)
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
        done();
      });
  });


  it('returns a data object with correct user property types', done => {
    axios.get('http://127.0.0.1:8000/api/users/id/'+userID)
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
        done();
      });
  });

  it('returns a data object with a matching user id', done => {
    axios.get('http://127.0.0.1:8000/api/users/id/'+userID)
      .then((res) => {
        chai.expect(res.status).to.equal(200);
        chai.expect(res.hasOwnProperty('data')).to.be.true;
        chai.expect(res.data).to.be.an('object');
        chai.expect(res.data.hasOwnProperty('id')).to.be.true;
        chai.expect(res.data.id).to.be.an('number');
        chai.expect(res.data.id).to.equal(userID);
        done();
      });
  });


});

describe("The Server's /users/create route", () => {
  it('returns 201 and { created: true, user_id: <id> }', () => {

    axios.post('http://127.0.0.1:8000/api/users/create', newUser)
      .then((res) => {
        chai.expect(res.status).to.equal(201);
        chai.expect(res.hasOwnProperty('data')).to.be.true;
        chai.expect(res.data).to.be.an('object');
        // chai.expect(res.data.created).to.be.true;
        // chai.expect(res.data.user_id).to.be.a("number");
        // newUserID = res.data.user_id;
        // done();
      });

  });
});


describe.skip("The Server's /users/create route", () => {
  it('returns 200 and { created: false }', done => {

    axios.post('http://127.0.0.1:8000/api/users/create', newUser)
      .then((res) => {
        chai.expect(res.status).to.equal(200);
        chai.expect(res.hasOwnProperty('data')).to.be.true;
        chai.expect(res.data).to.be.an('object');
        chai.expect(res.data.created).to.be.false;
        done();
      });

  });
});



describe.skip("The Server's /users/auth route", () => {

  it('returns 200', done => {
    axios.post('http://127.0.0.1:8000/api/users/auth', { username: newUser.username, password: userPW }).then((res) => {
      chai.expect(res.status).to.equal(200);
      done();
    });
  });

  it('returns a data object', done => {
    axios.post('http://127.0.0.1:8000/api/users/auth', { username: newUser.username, password: userPW }).then((res) => {
      chai.expect(res.status).to.equal(200);
      chai.expect(res.hasOwnProperty('data')).to.be.true;
      chai.expect(res.data).to.be.an('object');
      done();
    });
  });


  it('returns a data object with correct user property names', done => {
    axios.post('http://127.0.0.1:8000/api/users/auth', { username: newUser.username, password: userPW }).then((res) => {
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
    });
  });


  it('returns a data object with correct user property types', done => {
    axios.post('http://127.0.0.1:8000/api/users/auth', { username: newUser.username, password: userPW }).then((res) => {
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
    });
  });


  it('returns a data object with matching user property values', done => {
    axios.post('http://127.0.0.1:8000/api/users/auth', { username: newUser.username, password: userPW }).then((res) => {
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
    });
  });

});


describe.skip("The Server's /users/update route", () => {
  it('returns 200', done => {

    axios.post('http://127.0.0.1:8000/api/users/update/' + newUserID, updatedUser)
      .then((res) => {
        chai.expect(res.status).to.equal(200);
        done();
      });
  });

  it('updated the user properly', done => {

    axios.get('http://127.0.0.1:8000/api/users/id/' + newUserID).then((res) => { // console.log('status', res.status)
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
    });

  });
});




describe.skip("The Server's /users/destroy route", () => {
  it('returns 200', done => {

    axios.post('http://127.0.0.1:8000/api/users/destroy', { user_id: newUserID })
      .then((res) => {
        chai.expect(res.status).to.equal(200);
        chai.expect(res.data).to.be.an('number');
        chai.expect(res.data).to.equal(1);
        done();
      });

  });
});
