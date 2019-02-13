const https = require('https');
const NodeCache = require('node-cache');

// cache request responses for 15 minutes specified in seconds
const requestCache = new NodeCache({ stdTTL: 900 });

function makeCachableRequest(resolve, reject, requestParams) {
    requestCache.get(requestParams.path, (error, value) => {
        if (error) {
            reject(error);
        }
        if (value == undefined) {
            sendRequest(resolve, reject, requestParams);
        } else {
            resolve(value);
        }
    });
}

function sendRequest(resolve, reject, requestParams) {
    let req = https.request(requestParams, (response) => {
        let body = '';
        response.on('data', (d) => {
            body += d;
        });
        response.on('end', () => {
            body = JSON.stringify(JSON.parse(body), null, '  ');
            requestCache.set(requestParams.path, body);
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
    makeCachableRequest: makeCachableRequest
}