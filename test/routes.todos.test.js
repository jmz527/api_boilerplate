import axios from 'axios';
import chai from 'chai';

const API_URL = 'http://127.0.0.1:8000';
const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = Math.random() * 16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
};

describe("The Server's fetch all /api/todos route", () => {
  let res;
  before('fetch all todos', async () => {
    res = await axios.get(API_URL + '/api/todos');
  });

  it('returns 200', () => {
    chai.expect(res.status).to.equal(200)
  });

  it('returns a data array', () => {
    chai.expect(res.hasOwnProperty('data')).to.be.true;
    chai.expect(res.data).to.be.an('array');
  });
});

describe("The Server's fetch /api/todos/:id: route", () => {
  let res, newTodoID;
  const newTodo = { title: 'TEST_TITLE' };

  before('post a new todo then fetch that todo', async () => {
    res = await axios.post(API_URL + '/api/todos', newTodo);
    newTodoID = res.data.id;
    res = await axios.get(API_URL + '/api/todos/' + newTodoID);
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
    chai.expect(res.data.hasOwnProperty('title')).to.be.true;
    chai.expect(res.data.hasOwnProperty('createdAt')).to.be.true;
    chai.expect(res.data.hasOwnProperty('updatedAt')).to.be.true;
  });

  it('returns a data object with correct user property types', () => {
    chai.expect(res.data.id).to.be.an('number');
    chai.expect(res.data.title).to.be.an('string');
    chai.expect(res.data.createdAt).to.be.an('string');
    chai.expect(res.data.updatedAt).to.be.an('string');
  });

  it('returns a data object with a matching user id', () => {
    chai.expect(res.data.id).to.equal(newTodoID);
  });
});


describe("The Server's create /api/todos route", () => {
  let res, newTodoID;
  const newTodo = { title: 'TEST_TITLE' };

  before('post a new todo', async () => {
    res = await axios.post(API_URL + '/api/todos', newTodo);
    // newTodoID = res.data.id;
  });

  it('returns 201', () => {
    chai.expect(res.status).to.equal(201);
  });

  it('returns a data object', () => {
    chai.expect(res.hasOwnProperty('data')).to.be.true;
    chai.expect(res.data).to.be.an('object');
  });

  it('returns a data object with correct property names', () => {
    chai.expect(res.data.id).to.be.a("number");
  });
});

describe("The Server's update /api/todos route", () => {
  let res, newTodoID;
  const newTodo = { title: 'TEST_TITLE' };
  const updatedTodo = { title: 'UPDATED_TITLE' };

  before('post a new todo and then update it', async () => {
    res = await axios.post(API_URL + '/api/todos', newTodo);
    newTodoID = res.data.id;
    res = await axios.put(API_URL + '/api/todos/' + newTodoID, updatedTodo);
  });

  it('returns 201', () => {
    chai.expect(res.status).to.equal(201);
  });

  it('updated the todo properly', () => {
    chai.expect(res.data.id).to.be.an('number');
    chai.expect(res.data.title).to.be.an('string');
    chai.expect(res.data.id).to.equal(newTodoID);
    chai.expect(res.data.title).to.equal(updatedTodo.title);
  });
});


describe("The Server's create /api/todos/:id:/items route", () => {
  let res, newTodoID;
  const newTodo = { title: 'TEST_TITLE' };
  const newTodoItem = { content: 'TEST_CONTENT' };

  before('post a new todo and then update it', async () => {
    res = await axios.post(API_URL + '/api/todos', newTodo);
    newTodoID = res.data.id;
    res = await axios.post(API_URL + '/api/todos/' + newTodoID + '/items', newTodoItem);
  });

  it('returns 201', () => {
    chai.expect(res.status).to.equal(201);
  });

  it('returns a data object', () => {
    chai.expect(res.hasOwnProperty('data')).to.be.true;
    chai.expect(res.data).to.be.an('object');
  });

  it('returns a data object with correct property names', () => {
    chai.expect(res.data.id).to.be.a("number");
  });
});


describe("The Server's update /api/todos/:id:/items/:id: route", () => {
  let res, todoRes, newTodoID, newTodoItemID;
  const newTodo = { title: 'TEST_TITLE' };
  const newTodoItem = { content: 'TEST_CONTENT' };
  const updatedTodoItem = { content: 'UPDATED_CONTENT' };

  before('post a new todo, a new todo item and then update the todo item', async () => {
    res = await axios.post(API_URL + '/api/todos', newTodo);
    newTodoID = res.data.id;
    res = await axios.post(API_URL + '/api/todos/' + newTodoID + '/items', newTodoItem);
    newTodoItemID = res.data.id;
    res = await axios.put(API_URL + '/api/todos/' + newTodoID + '/items/' + newTodoItemID, updatedTodoItem);
    todoRes = await axios.get(API_URL + '/api/todos/' + newTodoID);
  });

  it('returns 201', () => {
    chai.expect(res.status).to.equal(201);
  });

  it('returns a data object', () => {
    chai.expect(res.hasOwnProperty('data')).to.be.true;
    chai.expect(res.data).to.be.an('object');
  });

  it('updated the todo item properly', () => {
    chai.expect(res.data.id).to.be.an('number');
    chai.expect(res.data.content).to.be.an('string');
    chai.expect(res.data.id).to.equal(newTodoItemID);
    chai.expect(res.data.content).to.equal(updatedTodoItem.content);
  });

  it('updated the todo item through the todo properly', () => {
    chai.expect(todoRes.data.todoItems).to.be.an('array');
    chai.expect(todoRes.data.todoItems.length).to.equal(1);
    chai.expect(todoRes.data.todoItems[0].content).to.be.an('string');
    chai.expect(todoRes.data.todoItems[0].content).to.equal(updatedTodoItem.content);
  });
});


describe("The Server's delete /api/todos/:id:/items/:id: route", () => {
  let res, todoRes, newTodoID, newTodoItemID;
  const newTodo = { title: 'TEST_TITLE' };
  const newTodoItem = { content: 'TEST_CONTENT' };

  before('post a new todo, a new todo item and then delete the todo item', async () => {
    res = await axios.post(API_URL + '/api/todos', newTodo);
    newTodoID = res.data.id;
    res = await axios.post(API_URL + '/api/todos/' + newTodoID + '/items', newTodoItem);
    newTodoItemID = res.data.id;
    res = await axios.delete(API_URL + '/api/todos/' + newTodoID + '/items/' + newTodoItemID);
    todoRes = await axios.get(API_URL + '/api/todos/' + newTodoID);
  });

  it('returns 204', () => {
    chai.expect(res.status).to.equal(204);
  });

  it('confirm the todo item deleted from the todo', () => {
    chai.expect(todoRes.data.todoItems).to.be.an('array');
    chai.expect(todoRes.data.todoItems.length).to.equal(0);
  });
});


describe("The Server's delete /api/todos route", () => {
  let res, newTodoID;
  const newTodo = { title: 'TEST_TITLE' };

  before('post a new todo, a new todo item and then delete the todo item', async () => {
    res = await axios.post(API_URL + '/api/todos', newTodo);
    newTodoID = res.data.id;
    res = await axios.delete(API_URL + '/api/todos/' + newTodoID);
  });

  it('returns 204', () => {
    chai.expect(res.status).to.equal(204);
  });
});
