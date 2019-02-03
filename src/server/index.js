const express = require('express');
const searchApi = require('./search-api');

const app = express();

app.use(express.static('dist'));
app.get('/api/news/search', (req, res) => {
  new Promise((resolve, reject) => searchApi.bingNewsSearch(resolve, reject, 'joe rogan'))
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      throw err;
    });
});
app.get('/api/video/search', (req, res) => {
  new Promise((resolve, reject) => searchApi.bingVideoSearch(resolve, reject, 'joe rogan'))
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      throw err;
    });
});
app.listen(8080, () => console.log('Listening on port 8080!'));