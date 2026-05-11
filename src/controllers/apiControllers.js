//require('dotenv').config();
const jwt = require('jsonwebtoken');

const {
    getUserByName, 
    createUser,
    updateUserProfile
} = require("../models/apiDatabaseUserModels");

const JWT_KEY = process.env.JWT_KEY;

function generateToken(res, user) {
    const token = jwt.sign(
        {
            id: user.id,
            name: user.name,
            phone_number: user.phone_number,
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
    const dataFinal = {
        name: info.name,
        email: info.email,
        phone_number: info.phone_number,
        gender: info.gender,
        birthday: info.birthday
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
            message: "User doesnt exists.",
            data: null
        });

        const user = await updateUserProfile(name, phone_number, email, gender, birthday);
        generateToken(res, user[0]);
        res.status(200).json({
            status: 200,
            message: "Update successfully.",
            data: user[0]
        });
    } catch(err) {}
}

module.exports = {
    apiLogin,
    apiSignup,
    apiLogout,
    apiAccountInformations,
    apiUpdateProfile
};