const fs = require('fs');
const path = require('path');

async function getAssetsService(asset) {
    return fs.readFileSync(path.join(__dirname, `../assets/${asset}`));
}

module.exports = {
    getAssetsService
};