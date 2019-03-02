import chai from 'chai';
import Sequelize from 'sequelize';
// import { TodoItem } from '../server/models';

// "database": "api-boilerplate-dev",
// "host": "127.0.0.1",
// "port": 5432,
// "dialect": "postgres",

describe("The Server's TodoItem model", () => {
  let database, Todo, TodoItem, todo, todoitem;

  before(async () => {
    database = new Sequelize('postgresql://127.0.0.1/todos-dev', { logging: false, operatorsAliases: false });
    Todo = database.define('todo', {
      title: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
    TodoItem = database.define('todoitem', {
      content: {
        type: Sequelize.STRING,
        allowNull: false
      },
      complete: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    });
    // TodoItem.associate = (models) => {
    //   TodoItem.belongsTo(models.Todo, {
    //     foreignKey: 'todoId',
    //     onDelete: 'CASCADE',
    //   });
    // };
  })

  beforeEach(async () => {
    await Todo.sync();
    await TodoItem.sync();
    await Todo.create({ title: 'zaiste' });
    todo = await Todo.findOne({ where: { title: 'zaiste' }});
    await TodoItem.create({ content: 'zaiContent', todoId: todo.id });
    todoitem = await TodoItem.findOne({ where: { content: 'zaiContent' }});
  })

  afterEach(async () => {
    await TodoItem.drop();
    await Todo.drop();
  })

  describe('# TodoItem.findOne function', () => {
    it('should find a todoitem', () => {
      chai.expect(todoitem).to.be.a('object');
    });

    it('the todoitem should have the correct attributes', () => {
      chai.expect(todoitem).to.have.property('id');
      // chai.expect(todoitem).to.have.property('todoId');
      chai.expect(todoitem).to.have.property('content');
    });

    it('the todoitem should have the correct attribute types', () => {
      chai.expect(todoitem.id).to.be.an('number');
      // chai.expect(todoitem.todoId).to.be.an('string');
      chai.expect(todoitem.content).to.be.an('string');
    });

    it("the todoitem's attributes should have the correct values", () => {
      chai.expect(todoitem.content).to.equal('zaiContent');
    });
  });
});
