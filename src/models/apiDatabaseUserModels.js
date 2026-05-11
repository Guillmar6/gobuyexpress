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

module.exports = {
    getUserByName,
    createUser,
    updateUserProfile
};