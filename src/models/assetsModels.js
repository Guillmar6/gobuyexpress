const fs = require('fs');
const path = require('path');

async function getImageService(imgName) {
    return fs.readFileSync(path.join(__dirname, `../assets/images/${imgName}`));
}

module.exports = {
    getImageService
};