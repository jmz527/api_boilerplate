import http from 'http'
import axios from 'axios'
import chai from 'chai'

// import settle from 'axios/lib/core/settle'

// function axiosTestAdapter(config) {
//   // At this point:
//   //  - config has been merged with defaults
//   //  - request transformers have already run
//   //  - request interceptors have already run
  
//   // Make the request using config provided
//   // Upon response settle the Promise

//   console.log("config", config);


//   return new Promise(function(resolve, reject) {
  
//     var response = {
//       // data: responseData,
//       // status: request.status,
//       // statusText: request.statusText,
//       // headers: responseHeaders,
//       config: config,
//       // request: request
//     };

//     settle(resolve, reject, response);

//     // From here:
//     //  - response transformers will run
//     //  - response interceptors will run
//   });
// }


// const config = {
//   // `timeout` specifies the number of milliseconds before the request times out.
//   // If the request takes longer than `timeout`, the request will be aborted.
//   timeout: 1000,
//   // `adapter` allows custom handling of requests which makes testing easier.
//   // Return a promise and supply a valid response (see lib/adapters/README.md).
//   adapter: axiosTestAdapter,
// }

describe('http://127.0.0.1:3030', () => {
  it('should return 200', done => {
    http.get('http://127.0.0.1:3030', res => { // console.log('statusCode', res.statusCode)
      chai.expect(res.statusCode).to.equal(200);
      done();
    });
  });
});


describe('http://127.0.0.1:3030/users', () => {
  it('should return 200', done => {
    http.get('http://127.0.0.1:3030', res => { // console.log('statusCode', res.statusCode)
      chai.expect(res.statusCode).to.equal(200);
      done();
    });
  });

  it('should return an array of users', () => {
    axios.get('http://127.0.0.1:3030/users')
      .then((res) => {
        chai.expect(res.data).to.be.an('object');
        chai.expect(res.data.users).to.be.an('array');
      })
      // .catch((err) => {
      //   console.log(err);
      // });
  });
});

describe('http://127.0.0.1:3030/users/id/0', () => {
  it('should return 200', done => {
    http.get('http://127.0.0.1:3030/users/id/0', res => { // console.log('statusCode', res.statusCode)
      chai.expect(res.statusCode).to.equal(200);
      done();
    });
  });

  const userID = 0;

  it('should return a user', () => {
    axios.get('http://127.0.0.1:3030/users/id/'+userID)
      .then((res) => {
        chai.expect(res.data).to.be.an('object');
        chai.expect(res.data.id).to.be.an('number');
        chai.expect(res.data.id).to.equal(userID);
        chai.expect(res.data.first_name).to.be.an('string');
        chai.expect(res.data.last_name).to.be.an('string');
        chai.expect(res.data.username).to.be.an('string');
        chai.expect(res.data.password).to.be.an('string');
        chai.expect(res.data.createdAt).to.be.an('string');
        chai.expect(res.data.updatedAt).to.be.an('string');
      })
  });

});

const newUser = {
  first_name: 'TEST',
  last_name: 'TEST',
  email: 'test@example.com',
  username: 'test123',
  password: '$2a$10$fmF.iYGBOD.Y1riR6nlhLuvzAa7Tj1YZBTaaPDZImDLRlEjSYk1rm',
}

var newUserID;

describe('http://127.0.0.1:3030/users/create', () => {
  it('should return 200', done => {

    axios.post('http://127.0.0.1:3030/users/create', newUser)
      .then((res) => {
        chai.expect(res.status).to.equal(200);
        chai.expect(res.data).to.be.an('object');
        chai.expect(res.data.created).to.be.true;
        chai.expect(res.data.user_id).to.be.a("number");
        newUserID = res.data.user_id;
        done();
      })

  });
});


describe('http://127.0.0.1:3030/users/auth', () => {
  it('should return 200', done => {

    axios.post('http://127.0.0.1:3030/users/auth', {
      username: newUser.username,
      password: 'password527'
    }).then((res) => {
      chai.expect(res.status).to.equal(200);
      chai.expect(res.data).to.be.an('object');
      chai.expect(res.data.id).to.be.an('number');
      chai.expect(res.data.id).to.equal(newUserID);
      chai.expect(res.data.first_name).to.be.an('string');
      chai.expect(res.data.first_name).to.equal(newUser.first_name);
      chai.expect(res.data.last_name).to.be.an('string');
      chai.expect(res.data.last_name).to.equal(newUser.last_name);
      chai.expect(res.data.username).to.be.an('string');
      chai.expect(res.data.username).to.equal(newUser.username);
      chai.expect(res.data.password).to.be.an('string');
      chai.expect(res.data.password).to.equal(newUser.password);
      chai.expect(res.data.createdAt).to.be.an('string');
      // chai.expect(res.data.createdAt).to.equal(newUser.createdAt);
      chai.expect(res.data.updatedAt).to.be.an('string');
      // chai.expect(res.data.updatedAt).to.equal(newUser.updatedAt);
      done();
    })

  });
});


describe('http://127.0.0.1:3030/users/update', () => {
  it('should return 200', done => {

    axios.post('http://127.0.0.1:3030/users/update/' + newUserID, { username: "UPDATED_USER_NAME" })
      .then((res) => {
        chai.expect(res.status).to.equal(200);


        console.log(res.data);
        // chai.expect(res.data).to.be.an('number');
        // chai.expect(res.data).to.equal(1);
        done();
      })

  });
});



describe('http://127.0.0.1:3030/users/destroy', () => {
  it('should return 200', done => {

    axios.post('http://127.0.0.1:3030/users/destroy', { user_id: newUserID })
      .then((res) => {
        chai.expect(res.status).to.equal(200);
        chai.expect(res.data).to.be.an('number');
        chai.expect(res.data).to.equal(1);
        done();
      })

  });
});
