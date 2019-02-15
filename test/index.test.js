import axios from 'axios'
import chai from 'chai'

describe("The Server's / route", () => {
  it('returns 200', done => {
    axios.get('http://127.0.0.1:8000').then((res) => {
      chai.expect(res.status).to.equal(200)
      done()
    })
  })
})

