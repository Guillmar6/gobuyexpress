const express = require('express');
const {
    loginPage,
    redirectMain
} = require("../controllers/pageControllers");
const { userTable } = require("../config/tables");

const pageRouter = express.Router();

pageRouter.get('/', redirectMain);
pageRouter.get('/login', userTable, loginPage);

module.exports = pageRouter;