require('dotenv').config();
const jwt = require('jsonwebtoken');

const {getUserByName, createUser} = require("../models/apiDatabaseUserModels");

const JWT_KEY = process.env.JWT_KEY;

function generateToken(res, user) {
    const token = jwt.sign(
        {
            id: user.id,
            name: user.name,
            phoneNumber: user.phome_number,
            email: user.email,
            gender: user.gender,
            birthday: user.birthday
        },
        JWT_KEY,
        {
            expiresIn: "1h"
        }
    );
    res.cookie(
        "goBuyExpressToken",
        token,
        {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
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
function apiAccountInformations(req, res, next) {
    const info = req.user;
    res.status(200).json({
        status: 200,
        message: "Success",
        data: info
    });
}

module.exports = {
    apiLogin,
    apiSignup,
    apiLogout,
    apiAccountInformations
};