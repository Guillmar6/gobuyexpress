const express = require('express');
const {
    getImage,
    getIcon
} = require("../controllers/assetsController");

const assetsRouter = express.Router();

assetsRouter.get('/assets/images/:imgName', getImage);

module.exports = assetsRouter;