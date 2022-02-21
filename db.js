const mysql = require("mysql");
const util = require("util");

const pool = mysql.createPool({
connectionLimit: 10,
    host: 'localhost',
    database: 'users',
    user: 'root',
    password: 'root',
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
    port: '8889'
});

pool.query = util.promisify(pool.query);
module.exports = pool;
