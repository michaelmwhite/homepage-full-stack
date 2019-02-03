const https = require('https');

// Good resources: https://www.tomas-dvorak.cz/posts/nodejs-request-without-dependencies/
// https://stackoverflow.com/questions/38533580/nodejs-how-to-promisify-http-request-reject-got-called-two-times
// MS docs: https://docs.microsoft.com/en-us/rest/api/cognitiveservices/bing-web-api-v7-reference
function bingVideoSearch(resolve, reject, search) {
    let subscriptionKey = '3fd7d3b07f0d4193a3ee63287ce7669e';
    let host = 'api.cognitive.microsoft.com';
    let path = '/bing/v7.0/videos/search';
    let queryParams = 'count=10&freshness=day'

    let requestParams = {
        method: 'GET',
        hostname: host,
        path: path + '?q=' + encodeURIComponent(search) + '&' + queryParams,
        headers: {
            'Ocp-Apim-Subscription-Key': subscriptionKey,
        }
    };

    let req = https.request(requestParams, (response) => {
        let body = '';
        response.on('data', (d) => {
            body += d;
        });
        response.on('end', () => {
            body = JSON.stringify(JSON.parse(body), null, '  ');
            resolve(body);
        });
        response.on('error', (e) => {
            reject(e);
        });
    });
    req.on('error', (e) => {
        reject(e);
    });
    req.end();
}

function bingNewsSearch(resolve, reject, search) {
    let subscriptionKey = '3fd7d3b07f0d4193a3ee63287ce7669e';
    let host = 'api.cognitive.microsoft.com';
    let path = '/bing/v7.0/news/search';
    let queryParams = 'freshness=day'

    let requestParams = {
        method: 'GET',
        hostname: host,
        path: path + '?q=' + encodeURIComponent(search) + '&' + queryParams,
        headers: {
            'Ocp-Apim-Subscription-Key': subscriptionKey,
        }
    };

    let req = https.request(requestParams, (response) => {
        let body = '';
        response.on('data', (d) => {
            body += d;
        });
        response.on('end', () => {
            body = JSON.stringify(JSON.parse(body), null, '  ');
            resolve(body);
        });
        response.on('error', (e) => {
            reject(e);
        });
    });
    req.on('error', (e) => {
        reject(e);
    });
    req.end();
}

module.exports = {
    bingVideoSearch: bingVideoSearch,
    bingNewsSearch: bingNewsSearch
}