const express = require('express');
const {
    apiLogin,
    apiLogout,
    apiSignup,
    apiAccountInformations,
    apiUpdateProfile
} = require("../controllers/apiControllers");

const apiRouter = express.Router();

apiRouter.post('/login', apiLogin);
apiRouter.post('/signup', apiSignup);
apiRouter.get('/logout', apiLogout);
apiRouter.get('/accountInformations', apiAccountInformations);
apiRouter.post('/updateProfile', apiUpdateProfile);

module.exports = apiRouter;