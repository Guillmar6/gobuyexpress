const express = require('express');
const {
    loginPage,
    redirectMain,
    homePage
} = require("../controllers/pageControllers");
const { userTable } = require("../config/tables");

const pageRouter = express.Router();

pageRouter.get('/', redirectMain);
pageRouter.get('/login', userTable, loginPage);
pageRouter.get('/in/:page', homePage);
pageRouter.get('/in/:page/:index', homePage);

module.exports = pageRouter;