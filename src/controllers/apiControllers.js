require('dotenv').config();
const jwt = require('jsonwebtoken');

const {
    getUserByName, 
    createUser,
    updateUserProfile,
    changeUserPassword,
    updateUserAddress,
    getProductInfoByName,
    addCartToUser,
    getCartsFromUser,
    removeCartFromUser,
    addOrderToUser,
    getOrdersFromUser,
    removeOrderFromUser
} = require("../models/apiDatabaseUserModels");
const {
    capturePayment,
    createOrder
} = require('../services/paypal');

const JWT_KEY = process.env.JWT_KEY;

function generateToken(res, user) {
    const token = jwt.sign(
        {
            id: user.id,
            name: user.name
        },
        JWT_KEY,
        {
            expiresIn: "24h"
        }
    );
    res.cookie(
        "goBuyExpressToken",
        token,
        {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 60 * 60 * 1000
        }
    );
}

async function apiLogin(req, res, next) {
    const { name, password} = req.body;
    try {
        const user = await getUserByName(name);
        if(user.length == 0 || password !== user[0].password) return res.status(400).redirect('/login?login_message=Invalid+username+or+password');

        generateToken(res, user[0]);
        res.status(200).redirect('/in/home/home.html');
    } catch(err) {
        res.status(400).redirect('/login');
    }
}
async function apiSignup(req, res, next) {
    const { name, password } = req.body;
    try {
        const userExist = await getUserByName(name);
        if(userExist.length !== 0) return res.status(400).redirect('/login?signup_message=Username+already+exists');
        
        const user = await createUser(name, password);
        generateToken(res, user[0]);
        res.status(200).redirect('/in/home/home.html');
    } catch(err) {
        res.status(400).redirect('/login');
    }
}
function apiLogout(req, res, next) {
    res.clearCookie("goBuyExpressToken");
    res.status(200).redirect('/login');
}
async function apiAccountInformations(req, res, next) {
    const info = req.user;
    const userInfoFromDB = await getUserByName(info.name);
    const dataFinal = {
        name: info.name,
        email: userInfoFromDB[0].email,
        phone_number: userInfoFromDB[0].phone_number,
        gender: userInfoFromDB[0].gender,
        birthday: userInfoFromDB[0].birthday,
        address: userInfoFromDB[0].address
    };
    res.status(200).json({
        status: 200,
        message: "Success",
        data: dataFinal
    });
}
async function apiUpdateProfile(req, res, next) {
    const currentUser = req.user.name;
    const {
        name,
        phone_number,
        email,
        gender,
        birthday
    } = req.body;
    try {
        const result = getUserByName(currentUser);
        if(result.length === 0) return res.status(404).json({
            status: 404,
            message: "User does not exists.",
            data: null
        });

        const user = await updateUserProfile(name, phone_number, email, gender, birthday);
        generateToken(res, user[0]);
        res.status(200).json({
            status: 200,
            message: "Update successfully.",
            data: data
        });
    } catch(err) {
        console.log(`Error: ${err.stack}`);
    }
}

async function apiUpdateAddress(req, res, next) {
    const currentUser = req.user.name;
    const { address } = req.body;
    try {
        const result = getUserByName(currentUser);
        if(result.length === 0) return res.status(404).json({
            status: 404,
            message: "User does not exists.",
            data: null
        });
        const user = await updateUserAddress(currentUser, address);
        generateToken(res, user[0]);
        res.status(200).json({
            status: 200,
            message: "Update successfully",
            data: null
        });
    } catch(err) {
        console.log(`Error: ${err.stack}`);
    }
}

async function apiChange_password(req, res, next) {
    const {
        old_password,
        new_password
    } = req.body;
    try {
        const getInfo = await getUserByName(req.user.name);
        if(getInfo.length === 0) return res.status(404).json({
            status: 404,
            message: "User not found",
            data: null
        });

        if(old_password !== getInfo[0].password) return res.status(400).json({
            status: 400,
            message: "Wrong currentPassword",
            data: null
        });

        const result = await changeUserPassword(new_password, req.user.name);
        res.status(200).json({
            status: 200,
            message: "Change password successfully!",
            data: null
        });
    } catch(err) {}
}

async function apiAddToCart(req, res, next) {
    const {
        productName
    } = req.body;
    try {
        const result = await addCartToUser(req.user.name, productName);
        res.status(200).json({
            status: 200,
            message: "Add to cart success.",
            data: null
        });
    } catch (err) {}
}

async function apiGetProductInfoByName(req, res, next) {
    const {
        productName
    } = req.body;
    try {
        const result = await getProductInfoByName(productName);
        res.status(200).json({
            status: 200,
            message: "Success get info!",
            data: result[0]
        });
    } catch (err) {}
}

async function apiGetCartsFromUser(req, res, next) {
    try {
        const result = await getCartsFromUser(req.user.name);
        res.status(200).json({
            status: 200,
            message: "Success get carts!",
            data: result
        });
    } catch (err) {}
}

async function apiRemoveCartFromUser(req, res, next) {
    const {
        productName
    } = req.body;
    try {
        const result = await removeCartFromUser(req.user.name, productName);
        res.status(200).json({
            status: 200,
            message: "Success cart remove!",
            data: result
        });
    } catch (err) {}
}

async function apiPaypalPayment(req, res, next) {
    const {
        productName,
        productDescription
    } = req.body;
    try {
        const productInfo = await getProductInfoByName(productName);    
        const url = await createOrder(productName, productDescription, productInfo[0].product_price, 'PHP');

        res.status(200).json({
            status: 200,
            message: "Paypal Payment",
            data: url
        });
    } catch (err) {
        console.log(err.stack)
    }
}

async function apiCapturePayment(req, res, next) {
    try {
        await capturePayment(req.query.token);

        await addOrderToUser(req.user.name, req.query.productName);
        await removeCartFromUser(req.user.name, req.query.productName);
        
        res.redirect(process.env.BASE_URL + '/in/account/account.html#order_history');
    } catch (err) {}
}

async function apiGetOrdersFromUser(req, res, next) {
    try {
        const result = await getOrdersFromUser(req.user.name);
        res.status(200).json({
            status: 200,
            message: "Success get orders!",
            data: result
        });
    } catch (err) {}
}

async function apiRemoveOrderFromUser(req, res, next) {
    const {
        productName
    } = req.body;
    try {
        const result = await removeOrderFromUser(req.user.name, productName);
        res.status(200).json({
            status: 200,
            message: "Success order remove!",
            data: result
        });
    } catch (err) {}
}

module.exports = {
    apiLogin,
    apiSignup,
    apiLogout,
    apiAccountInformations,
    apiUpdateProfile,
    apiChange_password,
    apiUpdateAddress,
    apiAddToCart,
    apiGetProductInfoByName,
    apiGetCartsFromUser,
    apiRemoveCartFromUser,
    apiPaypalPayment,
    apiCapturePayment,
    apiGetOrdersFromUser,
    apiRemoveOrderFromUser
};