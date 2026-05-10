const {
    getImageService
} = require("../models/assetsModels");

function componentError(res, status, message, data = null) {
    res.status(status).json({
        status: status,
        message: message,
        data: data
    });
}

async function getImage(req, res, next) {
    const imgName = req.params.imgName;
    try {
        const image = await getImageService(imgName);
        res.status(200).send(image);
    } catch(err) {
        componentError(res, 404, "Can't find image.")
    }
}

module.exports = {
    getImage
};