//require('dotenv').config();
const jwt = require('jsonwebtoken');

function authenticateTokenRun(req, res, next) {
    if(req.url.startsWith('/login') ||
        req.url === '/' ||
        req.url === '/api/login' ||
        req.url === '/api/signup' ||
        req.url.startsWith('/assets')
    ) return next();
    const token = req.cookies.goBuyExpressToken;
    try {
        req.user = jwt.verify(token,  process.env.JWT_KEY);
        next();
    } catch(err) {
        res.clearCookie('goBuyExpressToken');
        res.status(403).redirect('/login');
    }
}

module.exports = {
    authenticateTokenRun
};