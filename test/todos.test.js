import axios from 'axios'
import chai from 'chai'

var newTodoID;
const todoID = 1;
const newTodo = { title: 'TEST_TITLE' };
const updatedTodo = { title: 'UPDATED_TITLE' };


describe("The Server's /todos route", () => {
  it('returns 200', () => {
    axios.get('http://127.0.0.1:8000/api/todos')
      .then((res) => chai.expect(res.status).to.equal(200));
  });

  it('returns a data object', () => {
    axios.get('http://127.0.0.1:8000/api/todos')
      .then((res) => {
        chai.expect(res.status).to.equal(200);
        chai.expect(res.hasOwnProperty('data')).to.be.true;
        chai.expect(res.data).to.be.an('object');
      });
  });

  it('returns a data object with an array', () => {
    axios.get('http://127.0.0.1:8000/api/todos')
      .then((res) => {
        chai.expect(res.status).to.equal(200);
        chai.expect(res.hasOwnProperty('data')).to.be.true;
        chai.expect(res.data).to.be.an('object');
        chai.expect(res.data.hasOwnProperty('todos')).to.be.true;
        chai.expect(res.data.todos).to.be.an('array');
      });
  });
});

describe("The Server's /todos/0 route", () => {
  it('returns 200', () => {
    axios.get('http://127.0.0.1:8000/api/todos/'+todoID)
      .then((res) => chai.expect(res.status).to.equal(200));
  });


  it('returns a data object', () => {
    axios.get('http://127.0.0.1:8000/api/todos/'+todoID)
      .then((res) => {
        chai.expect(res.status).to.equal(200);
        chai.expect(res.hasOwnProperty('data')).to.be.true;
        chai.expect(res.data).to.be.an('object');
      });
  });


  it('returns a data object with correct user property names', () => {
    axios.get('http://127.0.0.1:8000/api/todos/'+todoID)
      .then((res) => {
        chai.expect(res.status).to.equal(200);
        chai.expect(res.hasOwnProperty('data')).to.be.true;
        chai.expect(res.data).to.be.an('object');
        chai.expect(res.data.hasOwnProperty('id')).to.be.true;
        chai.expect(res.data.hasOwnProperty('title')).to.be.true;
        chai.expect(res.data.hasOwnProperty('createdAt')).to.be.true;
        chai.expect(res.data.hasOwnProperty('updatedAt')).to.be.true;
      });
  });


  it('returns a data object with correct user property types', () => {
    axios.get('http://127.0.0.1:8000/api/todos/'+todoID)
      .then((res) => {
        chai.expect(res.status).to.equal(200);
        chai.expect(res.hasOwnProperty('data')).to.be.true;
        chai.expect(res.data).to.be.an('object');
        chai.expect(res.data.hasOwnProperty('id')).to.be.true;
        chai.expect(res.data.hasOwnProperty('title')).to.be.true;
        chai.expect(res.data.hasOwnProperty('createdAt')).to.be.true;
        chai.expect(res.data.hasOwnProperty('updatedAt')).to.be.true;
        chai.expect(res.data.id).to.be.an('number');
        chai.expect(res.data.title).to.be.an('string');
        chai.expect(res.data.createdAt).to.be.an('string');
        chai.expect(res.data.updatedAt).to.be.an('string');
      });
  });

  it('returns a data object with a matching user id', () => {
    axios.get('http://127.0.0.1:8000/api/todos/'+todoID)
      .then((res) => {
        chai.expect(res.status).to.equal(200);
        chai.expect(res.hasOwnProperty('data')).to.be.true;
        chai.expect(res.data).to.be.an('object');
        chai.expect(res.data.hasOwnProperty('id')).to.be.true;
        chai.expect(res.data.id).to.be.an('number');
        chai.expect(res.data.id).to.equal(todoID);
      });
  });

});


describe("Posting to the Server's /todos route", () => {
  it('returns 201 and { created: true, todo_id: <id> }', done => {

    axios.post('http://127.0.0.1:8000/api/todos', newTodo)
      .then((res) => {
        chai.expect(res.status).to.equal(201);
        chai.expect(res.hasOwnProperty('data')).to.be.true;
        chai.expect(res.data).to.be.an('object');
        // chai.expect(res.data.created).to.be.true;
        chai.expect(res.data.id).to.be.a("number");
        newTodoID = res.data.id;
        done();
      });

  });
});

describe("Updating the Server's /todos route", () => {
  it('returns 200', done => {

    axios.put('http://127.0.0.1:8000/api/todos/' + newTodoID, updatedTodo)
      .then((res) => {
        chai.expect(res.status).to.equal(200);
        done();
      });
  });

  it('updated the todo properly', done => {

    axios.get('http://127.0.0.1:8000/api/todos/' + newTodoID).then((res) => { // console.log('status', res.status)
      chai.expect(res.status).to.equal(200);
      chai.expect(res.data.id).to.be.an('number');
      chai.expect(res.data.id).to.equal(newTodoID);
      chai.expect(res.data.title).to.be.an('string');
      chai.expect(res.data.title).to.equal(updatedTodo.title);
      done();
    });

  });
});

describe("Deleting using the Server's /todos route", () => {
  it('returns 200', done => {

    axios.delete('http://127.0.0.1:8000/api/todos/' + newTodoID)
      .then((res) => {
        chai.expect(res.status).to.equal(200);
        done();
      });

  });

  // it('attempting to fetch the todo now returns 404', done => {

  //   axios.get('http://127.0.0.1:8000/api/todos/' + newTodoID)
  //     .then((res) => {
  //       chai.expect(res.status).to.equal(404);
  //       done();
  //     });

  // });

});




