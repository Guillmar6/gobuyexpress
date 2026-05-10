const fs = require('fs');
const path = require('path');

function loginPageService() {
    const page = fs.readFileSync(path.join(__dirname, '../pages/login.html'));
    const script = fs.readFileSync(path.join(__dirname, '../pages/login.js'));
    const css = fs.readFileSync(path.join(__dirname, '../pages/login.css'));
    return { page, script, css };
}
function homePageService(reqPage, reqIndex = null) {
    if(reqIndex == null) {
        const page = fs.readFileSync(path.join(__dirname, `../pages/${reqPage}`));
        return { page };
    }
    const page = fs.readFileSync(path.join(__dirname, `../pages/${reqPage}/${reqIndex}`));
    return { page };
}

module.exports = {
    loginPageService,
    homePageService
};