const https = require('https');
const express = require('express');
const azure = require('ms-rest-azure');
const NewsSearchApiClient = require('azure-cognitiveservices-newssearch');

const app = express();
const credentials = new azure.CognitiveServicesCredentials('3fd7d3b07f0d4193a3ee63287ce7669e');
const searchClient = new NewsSearchApiClient(credentials);

app.use(express.static('dist'));
app.get('/api/search', (req, res) => {
  searchClient.newsOperations.search('joe rogan').then((result) => {
    // console.log(result.value);
    res.send({ searchData: result.value });
    bingVideoSearch('kittens');
  }).catch((err) => {
    throw err;
  });
});
app.listen(8080, () => console.log('Listening on port 8080!'));

function responseHandler(response) {
  let body = '';
  response.on('data', (d) => {
    body += d;
  });
  response.on('end', () => {
    body = JSON.stringify(JSON.parse(body), null, '  ');
  });
  response.on('error', (e) => {
    throw e;
  });
}

function bingVideoSearch(search) {
  let subscriptionKey = '3fd7d3b07f0d4193a3ee63287ce7669e';
  let host = 'api.cognitive.microsoft.com';
  let path = '/bing/v7.0/videos/search';

  let requestParams = {
    method: 'GET',
    hostname: host,
    path: path + '?q=' + encodeURIComponent(search),
    headers: {
      'Ocp-Apim-Subscription-Key': subscriptionKey,
    }
  };

  let req = https.request(requestParams, responseHandler);
  req.end();
}