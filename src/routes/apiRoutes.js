const express = require('express');
const {
    apiLogin,
    apiLogout,
    apiSignup,
    apiAccountInformations
} = require("../controllers/apiControllers");

const apiRouter = express.Router();

apiRouter.post('/login', apiLogin);
apiRouter.post('/signup', apiSignup);
apiRouter.get('/logout', apiLogout);
apiRouter.get('/accountInformations', apiAccountInformations);

module.exports = apiRouter;