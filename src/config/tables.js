const pool = require("./db");

async function userTable(req, res, next) {
    await pool.query(
        "CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, name VARCHAR NOT NULL, password VARCHAR NOT NULL, phone_number TEXT, email VARCHAR, gender VARCHAR, birthday TEXT)"
    );
    next();
}

module.exports = {
    userTable
};