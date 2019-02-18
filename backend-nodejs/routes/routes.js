const pool = require('../data/config');

const router = app => {

    // Display all users
    app.get('/vehicles', (request, response) => {
        pool.query(
            `SELECT vin, reg_number, Users.user_id, Users.customer_name, Users.customer_address FROM Vehicles 
            INNER JOIN Users
            ON Users.user_id = Vehicles.car_owner_id;`,
            (error, result) => {
           if (error) {
            console.log("ERROR IN fetching Vehicles QUERY");
            throw error;
           }
           response.send(result);
        });
    });

    // Display vehicles by user by ID
    app.get('/users/:id', (request, response) => {
        const id = request.params.id;
        pool.query(
                `SELECT vin, reg_number, Users.user_id, Users.customer_name, Users.customer_address FROM Vehicles 
                INNER JOIN Users
                ON Users.user_id = Vehicles.car_owner_id
                WHERE Users.user_id = ?;`, id,
                 (error, result) => {
            if (error) {
                console.log("ERROR IN fetching Vehicles QUERY");
                throw error;
            }
            response.send(result);
        });
    });

    // Add a new user
    // app.post('/users', (request, response) => {
    //     pool.query('INSERT INTO Users SET ?', request.body, (error, result) => {
    //         if (error) {
    //             console.log("ERROR IN USER INSERTION");
    //             throw error;
    //         }
    //         response.status(201).send(`User added with ID: ${result.insertId}`);
    //     });
    // });

}

module.exports = router;