const express = require('express');
const {
    apiLogin,
    apiLogout,
    apiSignup,
    apiAccountInformations,
    apiUpdateProfile,
    apiChange_password,
    apiUpdateAddress
} = require("../controllers/apiControllers");

const apiRouter = express.Router();

apiRouter.post('/login', apiLogin);
apiRouter.post('/signup', apiSignup);
apiRouter.get('/logout', apiLogout);
apiRouter.get('/accountInformations', apiAccountInformations);
apiRouter.post('/updateProfile', apiUpdateProfile);
apiRouter.post('/updateAddress', apiUpdateAddress);
apiRouter.post('/change_password', apiChange_password);

module.exports = apiRouter;