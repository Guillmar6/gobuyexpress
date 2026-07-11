const pool = require("./db");

async function userTable(req, res, next) {
    await pool.query(
        "CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, name VARCHAR NOT NULL, password VARCHAR NOT NULL, phone_number TEXT, email VARCHAR, gender VARCHAR, birthday TEXT, address TEXT, carts TEXT[], orders TEXT[])"
    );
    await pool.query(
        "CREATE TABLE IF NOT EXISTS products(product_id SERIAL PRIMARY KEY, product_name TEXT NOT NULL, product_type TEXT NOT NULL, product_description TEXT NOT NULL, product_price TEXXT NOT NULL)"
    );
    next();
}

module.exports = {
    userTable
};