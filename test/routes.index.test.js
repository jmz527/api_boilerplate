import axios from 'axios';
import chai from 'chai';

const API_URL = 'http://127.0.0.1:8000';

describe("The Server's / route", () => {
  let res;
  before('call root', async () => {
    res = await axios.get(API_URL + '/');
  });

  it('returns 200', () => {
    chai.expect(res.status).to.equal(200);
  });

  it('returns a data object', () => {
    chai.expect(res.hasOwnProperty('data')).to.be.true;
    chai.expect(res.data).to.be.an('object');
  });

  it('returns a data object with a message', () => {
    chai.expect(res.data.hasOwnProperty('message'));
    chai.expect(res.data.message).to.be.an('string');
    chai.expect(res.data.message).to.equal('Welcome to the beginning of nothingness.');
  });

});

describe("The Server's /api route", () => {
  let res;
  before('call root', async () => {
    res = await axios.get(API_URL + '/api');
  });

  it('returns 200', () => {
    chai.expect(res.status).to.equal(200);
  });

  it('returns a data object', () => {
    chai.expect(res.hasOwnProperty('data')).to.be.true;
    chai.expect(res.data).to.be.an('object');
  });

  it('returns a data object with a message', () => {
    chai.expect(res.data.hasOwnProperty('message'));
    chai.expect(res.data.message).to.be.an('string');
    chai.expect(res.data.message).to.equal('Welcome to the Todos API!');
  });
});

