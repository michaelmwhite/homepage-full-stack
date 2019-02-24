const keys = require('../keys');
const cacheUtil = require('./cache-util');

// TODO: make returned results better - booting freshness up to a week helped, but will stories get
// changed out enough? maybe request a greater number of stories and then ignore ones in history

// Good resources: https://www.tomas-dvorak.cz/posts/nodejs-request-without-dependencies/
// https://stackoverflow.com/questions/38533580/nodejs-how-to-promisify-http-request-reject-got-called-two-times
// MS docs: https://docs.microsoft.com/en-us/rest/api/cognitiveservices/bing-web-api-v7-reference
function bingVideoSearch(resolve, reject, search) {
    let subscriptionKey = keys.azureKey;
    let host = 'api.cognitive.microsoft.com';
    let path = '/bing/v7.0/videos/search';
    let queryParams = 'count=3&freshness=week'
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
    let queryParams = 'count=3&freshness=week'
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