const mysql = require('mysql')

const config = {
    host: 'localhost',
    user: 'root',
    password: 'okokok',
    database: 'vehicle_task',
};

// Create a MySQL pool
const pool = mysql.createPool(config);

// Export the pool
module.exports = pool;