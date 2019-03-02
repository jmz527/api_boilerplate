import axios from 'axios';
import chai from 'chai';

const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = Math.random() * 16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
};

describe("The Server's /users route", () => {
  let res;
  beforeEach('make the API call', async () => {
    // console.log('beforeEach');
    res = await axios.get('http://127.0.0.1:8000/api/users');
  });

  it('returns 200', () => {
    chai.expect(res.status).to.equal(200)
  });

  it('returns a data object', () => {
    chai.expect(res.hasOwnProperty('data')).to.be.true;
    chai.expect(res.data).to.be.an('object');
  });

  it('returns a data object with an array', () => {
    chai.expect(res.data.hasOwnProperty('users')).to.be.true;
    chai.expect(res.data.users).to.be.an('array');
  });
});

const userID = 6;

describe("The Server's /users/" + userID + " route", () => {
  let res;
  beforeEach('make the API call', async () => {
    res = await axios.get('http://127.0.0.1:8000/api/users/' + userID);
  });

  it('returns 200', () => {
    chai.expect(res.status).to.equal(200)
  });

  it('returns a data object', () => {
    chai.expect(res.hasOwnProperty('data')).to.be.true;
    chai.expect(res.data).to.be.an('object');
  });

  it('returns a data object with correct user property names', () => {
    chai.expect(res.data.hasOwnProperty('id')).to.be.true;
    chai.expect(res.data.hasOwnProperty('first_name')).to.be.true;
    chai.expect(res.data.hasOwnProperty('last_name')).to.be.true;
    chai.expect(res.data.hasOwnProperty('username')).to.be.true;
    chai.expect(res.data.hasOwnProperty('password')).to.be.true;
    chai.expect(res.data.hasOwnProperty('createdAt')).to.be.true;
    chai.expect(res.data.hasOwnProperty('updatedAt')).to.be.true;
  });

  it('returns a data object with correct user property types', () => {
    chai.expect(res.data.id).to.be.an('number');
    chai.expect(res.data.first_name).to.be.an('string');
    chai.expect(res.data.last_name).to.be.an('string');
    chai.expect(res.data.username).to.be.an('string');
    chai.expect(res.data.password).to.be.an('string');
    chai.expect(res.data.createdAt).to.be.an('string');
    chai.expect(res.data.updatedAt).to.be.an('string');
  });

  it('returns a data object with a matching user id', () => {
    chai.expect(res.data.id).to.equal(userID);
  });
});

describe("The Server's /users/create route", () => {
  let res, newUser, newUserID, userUUID, userPW = 'password527';

  before('make the API call', async () => {
    userUUID = generateUUID();
    newUser = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'j.doe.' + userUUID + '@example.com',
      username: 'jdoe' + userUUID,
      password: '$2a$10$fmF.iYGBOD.Y1riR6nlhLuvzAa7Tj1YZBTaaPDZImDLRlEjSYk1rm',
    };

    res = await axios.post('http://127.0.0.1:8000/api/users/create', newUser);
    newUserID = res.data.id;
  });

  it('returns 201', () => {
    chai.expect(res.status).to.equal(201);
  });

  it('returns a data object', () => {
    chai.expect(res.hasOwnProperty('data')).to.be.true;
    chai.expect(res.data).to.be.an('object');
  });

});



describe("The Server's /users/auth route", () => {
  let res, newUser, newUserID, userUUID, userPW = 'password527';

  before('make the API call', async () => {
    userUUID = generateUUID();
    newUser = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'j.doe.' + userUUID + '@example.com',
      username: 'jdoe' + userUUID,
      password: '$2a$10$fmF.iYGBOD.Y1riR6nlhLuvzAa7Tj1YZBTaaPDZImDLRlEjSYk1rm',
    };

    await axios.post('http://127.0.0.1:8000/api/users/create', newUser);
    res = await axios.post('http://127.0.0.1:8000/api/users/auth', { username: newUser.username, password: userPW });
    newUserID = res.data.id;
  });

  it('returns 200', () => {
    chai.expect(res.status).to.equal(200);
  });

  it('returns a data object', () => {
    chai.expect(res.hasOwnProperty('data')).to.be.true;
    chai.expect(res.data).to.be.an('object');
  });

  it('returns a data object with correct user property names', () => {
    chai.expect(res.data.hasOwnProperty('id')).to.be.true;
    chai.expect(res.data.hasOwnProperty('first_name')).to.be.true;
    chai.expect(res.data.hasOwnProperty('last_name')).to.be.true;
    chai.expect(res.data.hasOwnProperty('username')).to.be.true;
    chai.expect(res.data.hasOwnProperty('password')).to.be.true;
    chai.expect(res.data.hasOwnProperty('createdAt')).to.be.true;
    chai.expect(res.data.hasOwnProperty('updatedAt')).to.be.true;
  });

  it('returns a data object with correct user property types', () => {
    chai.expect(res.data.id).to.be.an('number');
    chai.expect(res.data.first_name).to.be.an('string');
    chai.expect(res.data.last_name).to.be.an('string');
    chai.expect(res.data.username).to.be.an('string');
    chai.expect(res.data.password).to.be.an('string');
    chai.expect(res.data.createdAt).to.be.an('string');
    chai.expect(res.data.updatedAt).to.be.an('string');
  });


  it('returns a data object with matching user property values', () => {
    chai.expect(res.data.id).to.equal(newUserID);
    chai.expect(res.data.first_name).to.equal(newUser.first_name);
    chai.expect(res.data.last_name).to.equal(newUser.last_name);
    chai.expect(res.data.username).to.equal(newUser.username);
    chai.expect(res.data.password).to.equal(newUser.password);
  });

});


describe("The Server's /users/update route", () => {
  let res, newUser, newUserID, userUUID, userPW = 'password527';
  let user;

  before('make the API call', async () => {
    userUUID = generateUUID();
    newUser = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'j.doe.' + userUUID + '@example.com',
      username: 'jdoe' + userUUID,
      password: '$2a$10$fmF.iYGBOD.Y1riR6nlhLuvzAa7Tj1YZBTaaPDZImDLRlEjSYk1rm',
    };

    await axios.post('http://127.0.0.1:8000/api/users/create', newUser);
    res = await axios.post('http://127.0.0.1:8000/api/users/auth', { username: newUser.username, password: userPW });
    newUserID = res.data.id;

    const updatedUser = {
      first_name: 'Jane',
      last_name: 'Doo',
      email: 'j.doo.' + userUUID + '@example.com',
      username: 'jdoo' + userUUID,
      password: '$2a$10$fmF.iYGBOD.Y1riR6nlhLuvzAa7Tj1YZBTaaPDZImDLRlEjSYk1rm',
    };

    res = await axios.post('http://127.0.0.1:8000/api/users/update/' + newUserID, updatedUser);
  });

  // afterEach(async () => {
  //   // console.log('afterEach');
  //   // await User.drop();
  // });

  it('returns 200', () => {
    chai.expect(res.status).to.equal(200);
  });

  // it('returns a data object', () => {
  //   chai.expect(res.hasOwnProperty('data')).to.be.true;
  //   chai.expect(res.data).to.be.an('object');
  // });

  // it('returns a data object with correct user property names', () => {
  //   chai.expect(res.data.id).to.be.an('number');
  //   chai.expect(res.data.first_name).to.be.an('string');
  //   chai.expect(res.data.last_name).to.be.an('string');
  //   chai.expect(res.data.email).to.be.an('string');
  //   chai.expect(res.data.username).to.be.an('string');
  // });

  // it('returns a data object with matching user property values', () => {
  //   chai.expect(res.data.id).to.equal(newUserID);
  //   chai.expect(res.data.first_name).to.equal(updatedUser.first_name);
  //   chai.expect(res.data.last_name).to.equal(updatedUser.last_name);
  //   chai.expect(res.data.email).to.equal(updatedUser.email);
  //   chai.expect(res.data.username).to.equal(updatedUser.username);
  // });
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
