const fs = require('fs');

module.exports = (req, res) => {
    fs.readFile('./core/api/rest/config/config.json', 'utf8', (err, jsonString) => {
        if (err) {
            console.log('File read failed:', err);
            res.status(500).json(err);
            return;
        }
        res.status(200).json(JSON.parse(jsonString));
    });
};
