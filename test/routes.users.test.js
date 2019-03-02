import axios from 'axios';
import chai from 'chai';

const API_URL = 'http://127.0.0.1:8000';
const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = Math.random() * 16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
};

describe("Testing the Server's User Routes", () => {

  describe("# the Server's fetch all /api/users route", () => {
    let res;
    before('fetch all users', async () => {
      res = await axios.get(API_URL + '/api/users');
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


  describe("# the Server's fetch /api/users/:id: route", () => {
    let res, newUser, newUserID, userUUID;

    before('create and then fetch a single user', async () => {
      userUUID = generateUUID();
      newUser = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'j.doe.' + userUUID + '@example.com',
        username: 'jdoe' + userUUID,
        password: '$2a$10$fmF.iYGBOD.Y1riR6nlhLuvzAa7Tj1YZBTaaPDZImDLRlEjSYk1rm',
      };

      res = await axios.post(API_URL + '/api/users', newUser);
      newUserID = res.data.id;
      res = await axios.get(API_URL + '/api/users/' + newUserID);
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
      chai.expect(res.data.id).to.equal(newUserID);
    });
  });

  describe("# the Server's create /api/users route", () => {
    let res, newUser, newUserID, userUUID, userPW = 'password527';

    before('create a user', async () => {
      userUUID = generateUUID();
      newUser = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'j.doe.' + userUUID + '@example.com',
        username: 'jdoe' + userUUID,
        password: '$2a$10$fmF.iYGBOD.Y1riR6nlhLuvzAa7Tj1YZBTaaPDZImDLRlEjSYk1rm',
      };

      res = await axios.post(API_URL + '/api/users', newUser);
      newUserID = res.data.id;
    });

    after('delete the user you created', async () => {
      await axios.delete(API_URL + '/api/users', { user_id: newUserID });
    });

    it('returns 201', () => {
      chai.expect(res.status).to.equal(201);
    });

    it('returns a data object', () => {
      chai.expect(res.hasOwnProperty('data')).to.be.true;
      chai.expect(res.data).to.be.an('object');
    });

  });

  describe("# the Server's login /api/users/auth route", () => {
    let res, newUser, newUserID, userUUID, userPW = 'password527';

    before('create a user and authenticate', async () => {
      userUUID = generateUUID();
      newUser = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'j.doe.' + userUUID + '@example.com',
        username: 'jdoe' + userUUID,
        password: '$2a$10$fmF.iYGBOD.Y1riR6nlhLuvzAa7Tj1YZBTaaPDZImDLRlEjSYk1rm',
      };

      await axios.post(API_URL + '/api/users', newUser);
      res = await axios.post(API_URL + '/api/users/auth', { username: newUser.username, password: userPW });
      newUserID = res.data.id;
    });

    after('delete the user you created', async () => {
      await axios.delete(API_URL + '/api/users', { user_id: newUserID });
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


  describe("# the Server's update /api/users route", () => {
    let res, newUserID, userUUID, userPW = 'password527';
    let user;

    before('create a user and update that user', async () => {
      userUUID = generateUUID();
      const newUser = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'j.doe.' + userUUID + '@example.com',
        username: 'jdoe' + userUUID,
        password: '$2a$10$fmF.iYGBOD.Y1riR6nlhLuvzAa7Tj1YZBTaaPDZImDLRlEjSYk1rm',
      };
      const updatedUser = {
        first_name: 'Jane',
        last_name: 'Doo',
        email: 'j.doo.' + userUUID + '@example.com',
        username: 'jdoo' + userUUID,
        password: '$2a$10$fmF.iYGBOD.Y1riR6nlhLuvzAa7Tj1YZBTaaPDZImDLRlEjSYk1rm',
      };

      res = await axios.post(API_URL + '/api/users', newUser);
      newUserID = res.data.id;
      res = await axios.put(API_URL + '/api/users/' + newUserID, updatedUser);
    });

    after('delete the user you created', async () => {
      await axios.delete(API_URL + '/api/users', { user_id: newUserID });
    });

    it('returns 201', () => {
      chai.expect(res.status).to.equal(201);
    });

    it('returns a boolean', () => {
      chai.expect(res.hasOwnProperty('data')).to.be.true;
      chai.expect(res.data).to.be.an('boolean');
      chai.expect(res.data).to.be.false;
    });
  });

  describe("# the Server's delete /api/users route", () => {
    let res, newUser, newUserID, userUUID, userPW = 'password527';

    before('create a user and delete that user', async () => {
      userUUID = generateUUID();
      newUser = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'j.doe.' + userUUID + '@example.com',
        username: 'jdoe' + userUUID,
        password: '$2a$10$fmF.iYGBOD.Y1riR6nlhLuvzAa7Tj1YZBTaaPDZImDLRlEjSYk1rm',
      };

      await axios.post(API_URL + '/api/users', newUser);
      res = await axios.delete(API_URL + '/api/users', { user_id: newUserID });
      // newUserID = res.data.id;
    });

    it('returns 204', () => {
      chai.expect(res.status).to.equal(204);
    });
  });

});

