import chai from 'chai';
import Sequelize from 'sequelize';
// import { Todo } from '../server/models';

// "database": "api-boilerplate-dev",
// "host": "127.0.0.1",
// "port": 5432,
// "dialect": "postgres",

describe("The Server's Todo model", () => {
  let database, Todo, todo;

  before(async () => {
    database = new Sequelize('postgresql://127.0.0.1/todos-dev', { logging: false, operatorsAliases: false });
    Todo = database.define('todo', {
      title: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  })

  beforeEach(async () => {
    await Todo.sync();
    await Todo.create({ title: 'zaiste' });
    todo = await Todo.findOne({ where: { title: 'zaiste' }});
  })

  afterEach(async () => {
    await Todo.drop();
  })

  describe('# Todo.findOne function', () => {
    it('should find a todo', () => {
      chai.expect(todo).to.be.a('object');
    });

    it('the todo should have the correct attributes', () => {
      chai.expect(todo).to.have.property('title');
    });

    it("the todo's attributes should have the correct values", () => {
      chai.expect(todo.title).to.equal('zaiste');
    });
  });
});
