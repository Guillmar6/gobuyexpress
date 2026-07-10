const pool = require('../config/db');

async function getUserByName(name) {
    const result = await pool.query(
        "SELECT * FROM users WHERE name = $1",
        [name]
    );
    return result.rows;
}
async function createUser(name, password) {
    const result = await pool.query(
        "INSERT INTO users(name, password) VALUES($1, $2) RETURNING *",
        [name, password]
    );
    return result.rows;
}
async function updateUserProfile(name, phone_number, email, gender, birthday) {
    const result = await pool.query(
        "UPDATE users SET name=$1,phone_number=$2,email=$3,gender=$4,birthday=$5 WHERE name=$1 RETURNING *",
        [name, phone_number, email, gender, birthday]
    );
    return result.rows;
}
async function updateUserAddress(name, address) {
    const result = await pool.query(
        "UPDATE users SET address=$2 WHERE name=$1 RETURNING *",
        [name, address]
    );
    return result.rows;
}

async function changeUserPassword(password, username) {
    const result = await pool.query(
        "UPDATE users SET password=$1 WHERE name=$2 RETURNING *",
        [password, username]
    );
    return result.rows;
}

async function addCartToUser(username, productName) {
    const result = await pool.query(
        "UPDATE users SET carts=array_append(carts, $2) WHERE name=$1 RETURNING *",
        [username, productName]
    );
    return result.rows;
}

async function getProductInfoByName(name) {
    const result = await pool.query(
        "SELECT * FROM products WHERE product_name = $1",
        [name]
    );
    return result.rows;
}

async function getCartsFromUser(username) {
    const result = await pool.query(
        "SELECT carts FROM users WHERE name = $1",
        [username]
    );
    return result.rows;
}

async function removeCartFromUser(username, productName) {
    const result = await pool.query(
        "UPDATE users SET carts = array_remove(carts, $2) WHERE name = $1 RETURNING *",
        [username, productName]
    );
    return result.rows;
}

module.exports = {
    getUserByName,
    createUser,
    updateUserProfile,
    changeUserPassword,
    updateUserAddress,
    getProductInfoByName,
    addCartToUser,
    getCartsFromUser,
    removeCartFromUser
};