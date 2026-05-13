const { getAssets } = require("../controllers/assetsController");

function assetsRequests(req, res, next) {
    getAssets(res, req.path, next);
}

module.exports = {
    assetsRequests
};