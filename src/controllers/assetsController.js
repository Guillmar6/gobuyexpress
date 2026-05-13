const {
    getAssetsService
} = require("../models/assetsModels");

function componentError(res, status, message, data = null) {
    res.status(status).json({
        status: status,
        message: message,
        data: data
    });
}

async function getAssets(res, asset, next) {
    if(!asset.startsWith("/api")) return next();
    const assetSub = asset.substring(4);
    try {
        const image = await getAssetsService(assetSub);
        res.status(200).setHeader("Content-Type", "text/plain").end(image);
    } catch(err) {
        componentError(res, 404, "Can't find image.")
    }
}

module.exports = {
    getAssets
};