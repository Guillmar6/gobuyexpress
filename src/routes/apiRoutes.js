const express = require('express');
const {
    apiLogin,
    apiLogout,
    apiSignup,
    apiAccountInformations,
    apiUpdateProfile,
    apiChange_password,
    apiUpdateAddress,
    apiAddToCart,
    apiGetProductInfoByName,
    apiGetCartsFromUser,
    apiRemoveCartFromUser
} = require("../controllers/apiControllers");

const apiRouter = express.Router();

apiRouter.post('/login', apiLogin);
apiRouter.post('/signup', apiSignup);
apiRouter.get('/logout', apiLogout);
apiRouter.get('/accountInformations', apiAccountInformations);
apiRouter.post('/updateProfile', apiUpdateProfile);
apiRouter.post('/updateAddress', apiUpdateAddress);
apiRouter.post('/change_password', apiChange_password);
apiRouter.post('/addToCart', apiAddToCart);
apiRouter.post('/getProductByName', apiGetProductInfoByName);
apiRouter.post('/getCartsFromUser', apiGetCartsFromUser);
apiRouter.post('/removeCartFromUser', apiRemoveCartFromUser);

module.exports = apiRouter;