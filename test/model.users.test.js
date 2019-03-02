import chai from 'chai';
import Sequelize from 'sequelize';
// import { User } from '../server/models';

// "database": "api-boilerplate-dev",
// "host": "127.0.0.1",
// "port": 5432,
// "dialect": "postgres",

describe("The Server's User model", () => {
  let database, User, user;

  before(async () => {
    database = new Sequelize('postgresql://127.0.0.1/todos-dev', { logging: false, operatorsAliases: false });
    User = database.define('user', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      email: Sequelize.STRING,
      first_name: Sequelize.STRING,
      last_name: Sequelize.STRING,
      username: Sequelize.STRING,
      password: Sequelize.STRING
    });
  })

  beforeEach(async () => {
    await User.sync();
    await User.create({
      email: 'zaiste@example.com',
      first_name: 'John',
      last_name: 'Doe',
      username: 'zaiste',
      password: 'password123'
    });
    user = await User.findOne({ where: { username: 'zaiste' }});
  })

  afterEach(async () => {
    await User.drop();
  })

  describe('# User.findOne function', () => {
    it('should find a user', () => {
      chai.expect(user).to.be.a('object');
    });

    it('the user should have the correct attributes', () => {
      chai.expect(user).to.have.property('email');
      chai.expect(user).to.have.property('first_name');
      chai.expect(user).to.have.property('last_name');
      chai.expect(user).to.have.property('username');
      chai.expect(user).to.have.property('password');
    });

    it("the user's attributes should have the correct values", () => {
      chai.expect(user.email).to.equal('zaiste@example.com');
      chai.expect(user.first_name).to.equal('John');
      chai.expect(user.last_name).to.equal('Doe');
      chai.expect(user.username).to.equal('zaiste');
      chai.expect(user.password).to.equal('password123');
    });
  });
});
