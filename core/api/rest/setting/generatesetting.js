#! /usr/bin/env node
/* eslint-disable eqeqeq */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-shadow */
const fs = require('fs');
const path = require('path');
const { GraphQLClient, gql } = require('graphql-request');
const { graphqlEndpoint } = require('../../../../swift.config');
const { getAppEnv, getAccessEnv } = require('../../../helpers/env');

const baseDir = path.join(__dirname, '../setting/');

const appEnv = getAppEnv();

const graphQLClient = new GraphQLClient(`${graphqlEndpoint[appEnv] || graphqlEndpoint.prod}`, {
    method: 'GET',
    headers: {
        Authorization: `Bearer ${getAccessEnv()}`,
        'Content-Type': 'application/json',
    },
    jsonSerializer: {
        parse: JSON.parse,
        stringify: JSON.stringify,
    },
});

const getCurrencySchema = gql`
    {
        currency {
            base_currency_code
            base_currency_symbol
            default_display_currency_code
            default_display_currency_symbol
            available_currency_codes
            exchange_rates {
                currency_to
                rate
            }
        }
    }
`;

const getStoreSchema = gql`
    {
        availableStores{
            store_code
            store_name
            locale
            is_default_store
        }
    }
`;

async function getCurrency() {
    graphQLClient.request(getCurrencySchema, {}).then((data) => {
        fs.writeFile(`${baseDir}setting.json`, JSON.stringify(data), (err) => {
            if (err) throw err;
        });
    }).catch((err) => {
        // eslint-disable-next-line no-console
        console.log('generate currency failed', err);
    });
}

async function getStoreName() {
    graphQLClient.request(getStoreSchema, {}).then((data) => {
        const response = data;
        fs.readFile(`${baseDir}setting.json`, 'utf8', (err, dataRead) => {
            if (err) {
                console.log(err);
            } else {
                const objData = JSON.parse(dataRead);
                objData.availableStores = response.availableStores;
                const jsonData = JSON.stringify(objData);
                fs.writeFile(`${baseDir}setting.json`, jsonData, 'utf8', (err) => {
                    if (err) throw err;
                });
            }
        });
    }).catch((err) => {
        // eslint-disable-next-line no-console
        console.log('generate storename failed', err);
    });
}

const generateSetting = async () => {
    getCurrency()
        .then(async () => {
            await getStoreName();
        }).catch((err) => {
            console.log('generate setting failed', err);
        });
};

module.exports = {
    generateSetting,
};
