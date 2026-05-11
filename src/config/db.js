//require('dotenv').config();
const {
    Pool
} = require('pg');

const pool = new Pool({
    connectionString: process.env.DB_URL,
    ssl: {
        rejectUnauthorized: false
    }/*
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,*/
});

pool.on('connect', () => {
    console.log('Database Connected!');
});

module.exports = pool;