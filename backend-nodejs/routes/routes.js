const pool = require('../data/config');

const router = app => {

    // Display all users
    app.get('/users', (request, response) => {
        pool.query('SELECT * FROM Users', (error, result) => {
           if (error) {
            console.log("ERROR IN USERS QUERY");
            throw error;
           }
           response.send(result);
        });
    });

    // Display a single user by ID
    app.get('/users/:id', (request, response) => {
        const id = request.params.id;
        pool.query('SELECT * FROM Users WHERE user_id = ?', id, (error, result) => {
            if (error) {
                console.log("ERROR IN USER QUERY");
                throw error;
            }
            response.send(result);
        });
    });

    // Add a new user
    app.post('/users', (request, response) => {
        pool.query('INSERT INTO Users SET ?', request.body, (error, result) => {
            if (error) {
                console.log("ERROR IN USER INSERTION");
                throw error;
            }
            response.status(201).send(`User added with ID: ${result.insertId}`);
        });
    });
}

module.exports = router;