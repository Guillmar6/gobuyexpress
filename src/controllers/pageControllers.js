const fs = require('fs');
const path = require('path');

const {
    loginPageService,
    homePageService
} = require("../models/pageModels");

function redirectMain(req, res, next) {
    res.status(200).redirect('/login');
}

function loginPage(req, res, next) {
    const { page, css, script} = loginPageService();
    res.status(200).send(`${page} <script>${script}</script><style>${css}</style>`);
}
function homePage(req, res, next) {
    if(req.params.index == null) {
        const reqPage = req.params.page;
        const { page} = homePageService(reqPage);
        res.status(200).end(page);
        return;
    }
    const reqPage = req.params.page;
    const reqIndex = req.params.index;
    const { page} = homePageService(reqPage, reqIndex);
    res.status(200).end(page);
}

module.exports = {
    loginPage,
    redirectMain,
    homePage
};