const fs = require('fs');
const path = require('path');

const {
    loginPageService,
    pagesService
} = require("../models/pageModels");

function redirectMain(req, res, next) {
    res.status(200).redirect('/login');
}

function loginPage(req, res, next) {
    const { page, css, script} = loginPageService();
    res.status(200).send(`${page} <script>${script}</script><style>${css}</style>`);
}
function pages(req, res, next) {
    const { page} = pagesService(req.path);
    res.status(200).end(page);
}

module.exports = {
    loginPage,
    redirectMain,
    pages
};