const keys = require('../keys');
const cacheUtil = require('./cache-util');

// Good resources: https://www.tomas-dvorak.cz/posts/nodejs-request-without-dependencies/
// https://stackoverflow.com/questions/38533580/nodejs-how-to-promisify-http-request-reject-got-called-two-times
// MS docs: https://docs.microsoft.com/en-us/rest/api/cognitiveservices/bing-web-api-v7-reference
function bingVideoSearch(resolve, reject, search) {
    let subscriptionKey = keys.azureKey;
    let host = 'api.cognitive.microsoft.com';
    let path = '/bing/v7.0/videos/search';
    let queryParams = 'count=5&freshness=day'
    let requestParams = {
        method: 'GET',
        hostname: host,
        path: path + '?q=' + encodeURIComponent(search) + '&' + queryParams,
        headers: {
            'Ocp-Apim-Subscription-Key': subscriptionKey,
        }
    };
    cacheUtil.makeCachableRequest(resolve, reject, requestParams);
}

function bingNewsSearch(resolve, reject, search) {
    let subscriptionKey = keys.azureKey;
    let host = 'api.cognitive.microsoft.com';
    let path = '/bing/v7.0/news/search';
    let queryParams = 'count=5&freshness=day'
    let requestParams = {
        method: 'GET',
        hostname: host,
        path: path + '?q=' + encodeURIComponent(search) + '&' + queryParams,
        headers: {
            'Ocp-Apim-Subscription-Key': subscriptionKey,
        }
    };
    cacheUtil.makeCachableRequest(resolve, reject, requestParams);
}

module.exports = {
    bingVideoSearch: bingVideoSearch,
    bingNewsSearch: bingNewsSearch
}