const axios = require('axios')

axios.get('http://127.0.0.1:8000')
  .then(function (res) {
    console.log(res.status);
  })
  .catch(function (err) {
    console.log(err);
  });