const { getAppEnv, getAccessEnv } = require('../../helpers/env');
const { graphqlEndpoint } = require('../../../swift.config');

/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
module.exports = (req, res) => {
    const { token } = req.body;
    if (req.session.fcm_token !== token) {
        const query = `{
            storeConfig {
                swift_server {
                    fcm_key_server
                    fcm_topic
                }
            }
        }`;

        fetch(`${graphqlEndpoint[getAppEnv()]}?query=${encodeURI(query)}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${getAccessEnv()}`,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                const keyserver = `key=${responseJson.data.storeConfig.swift_server.fcm_key_server}`;
                fetch(`https://iid.googleapis.com/iid/v1/${token}/rel/topics/${responseJson.data.storeConfig.swift_server.fcm_topic}`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': 0,
                        Authorization: keyserver,
                    },
                })
                    .then((data) => {
                        req.session.fcm_token = token;
                        res.status(200).json({
                            status: 200,
                            message: 'success subscribe token',
                        });
                    })
                    .catch((err) => res.status(500).json(err));
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        res.json({
            status: 200,
            message: 'subscribe token',
        });
    }
};
