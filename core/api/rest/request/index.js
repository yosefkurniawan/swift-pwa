const { getAppEnv } = require('../../../helpers/env');
const { HOST } = require('../../../../swift.config');

function requestInternal(request) {
    const appEnv = getAppEnv();
    const url = HOST[appEnv] || HOST.prod;
    return new Promise((resolve) => {
        fetch(`${url}/${request}`)
            .then((response) => response.json())
            .then((data) => resolve(data));
    });
}

module.exports = requestInternal;
