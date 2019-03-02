const expect = require('chai').expect;
const Sequelize = require('sequelize');

// describe('users', () => {
//   let database;
//   let User;


//     // "database": "api-boilerplate-dev",
//     // "host": "127.0.0.1",
//     // "port": 5432,
//     // "dialect": "postgres",

//   before(async () => {
//     database = new Sequelize('postgresql://127.0.0.1/todos-dev', { logging: false, operatorsAliases: false });
//     User = database.define('user', {
//       username: Sequelize.STRING,
//       birthday: Sequelize.DATE
//     });
//   })

//   beforeEach(async () => {
//     await User.sync();
//     await User.create({
//       username: 'zaiste',
//       birthday: new Date(1988, 1, 21)
//     });
//   })

//   afterEach(async () => {
//     await User.drop();
//   })

//   describe('#find()', () => {
//     it('should find a user', async () => {
//       const user = await User.findOne({ where: { username: 'zaiste' }})
//       expect(user).to.be.a('object');
//       expect(user).to.have.property('username');
//       expect(user).to.have.property('birthday');
//       expect(user.username).to.equal('zaiste');
//     });
//   });
// });