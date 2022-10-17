/* eslint-disable no-restricted-syntax */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-globals */
/* eslint-disable radix */
/* eslint-disable no-await-in-loop */
/**
 *
 * PayPal Node JS SDK dependency
 */
const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');
const { getAppEnv } = require('../../../helpers/env');
const { modules, graphqlEndpoint } = require('../../../../swift.config');

/**
 *
 * Set up and return PayPal JavaScript SDK environment with PayPal access credentials.
 * This sample uses SandboxEnvironment. In production, use LiveEnvironment.
 *
 */
const query = `{
    storeConfig {
        paypal_key {
            cancel_url
            client_id
            client_secret
            disable_funding
            intent
            key_data
            key_token
            path
            redirect_url
        }
    }
}`;

function environment() {
                           // fetch(`${graphqlEndpoint[getAppEnv()]}?${encodeURI(query)}`, {
                           //     method: 'GET',
                           //     headers: {
                           //         Authorization: 'Bearer z42nzj61mfsbe5ys0qo2h5vha1icxe5a',
                           //     },
                           // })
                           //     .then((res) => {
                           //         console.log(res.json());
                           //         const appEnv = getAppEnv();
                           //         const clientId = modules.paypal.clientId[appEnv];
                           //         const clientSecret = modules.paypal.clientSecret[appEnv];

                           //         return new checkoutNodeJssdk.core.SandboxEnvironment(clientId, clientSecret);
                           //     })
                           //     .catch(() => {});
                           const appEnv = getAppEnv();
                           const clientId = modules.paypal.clientId[appEnv];
                           const clientSecret = modules.paypal.clientSecret[appEnv];

                           return new checkoutNodeJssdk.core.SandboxEnvironment(clientId, clientSecret);
                       }

/**
 *
 * Returns PayPal HTTP client instance with environment that has access
 * credentials context. Use this instance to invoke PayPal APIs, provided the
 * credentials have access.
 */
function client() {
    return new checkoutNodeJssdk.core.PayPalHttpClient(environment());
}

async function prettyPrint(jsonData, pre = '') {
    let pretty = '';
    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
    for (const key in jsonData) {
        if (jsonData.hasOwnProperty(key)) {
            if (isNaN(key)) { pretty += `${pre + capitalize(key)}: `; } else { pretty += `${pre + (parseInt(key) + 1)}: `; }
            if (typeof jsonData[key] === 'object') {
                pretty += '\n';
                pretty += await prettyPrint(jsonData[key], `${pre}    `);
            } else {
                pretty += `${jsonData[key]}\n`;
            }
        }
    }
    return pretty;
}

module.exports = { client, prettyPrint };
