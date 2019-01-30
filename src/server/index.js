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
  }).catch((err) => {
    throw err;
  });
});
app.listen(8080, () => console.log('Listening on port 8080!'));
