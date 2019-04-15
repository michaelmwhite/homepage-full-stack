const express = require('express');
const searchApi = require('./search-api');

const app = express();

app.use(express.static('dist'));
app.get('/api/news/search/:topic', (req, res) => {
  new Promise((resolve, reject) => searchApi.bingNewsSearch(resolve, reject, req.params.topic))
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      throw err;
    });
});
app.get('/api/video/search/:topic', (req, res) => {
  new Promise((resolve, reject) => searchApi.bingVideoSearch(resolve, reject, req.params.topic))
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      throw err;
    });
});
const port = process.env.PORT || 8080;
app.listen(port, () => console.log('Listening on port ' + port + '!'));