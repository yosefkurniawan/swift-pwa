const { decrypt } = require('../../helpers/encryption');

module.exports = (req, res) => {
    const { query, gmapApiKey } = req.body;

    fetch(`https://gmapkey.sandbox.id/maps/api/geocode/json?address=${query}&key=${decrypt(gmapApiKey)}`)
        .then((response) => response.json())
        .then((responseData) => {
            res.status(200).json(responseData);
        })
        .catch((e) => {
            res.status(500).json(e);
        });
};
