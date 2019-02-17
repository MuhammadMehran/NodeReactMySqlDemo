// Require packages and set the port
const express = require('express');
const bodyParser = require('body-parser');

const port = 3002;
const app = express();

app.get('/', (request, response) => {
    const randomValue = Math.random() >= 0.5;
    response.send({
        signal: randomValue
    })
});

// Start the server
const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);
    console.log(`SIMULATOR Server listening on port ${server.address().port}`);
});