// Require packages and set the port
const express = require('express');
const cors = require('cors');

const port = 3002;
const app = express();

app.use(cors())

app.get('/', (request, response) => {
    response.send([
        {
            vin: "YS2R4X20005399401",
            signal: Math.random() >= 0.5
        },
        {
            vin: "VLUR4X20009093588",
            signal: Math.random() >= 0.5
        },
        {
            vin: "VLUR4X20009048066",
            signal: Math.random() >= 0.5
        },
        {
            vin: "YS2R4X20005388011",
            signal: Math.random() >= 0.5
        },
        {
            vin: "YS2R4X20005387949",
            signal: Math.random() >= 0.5
        },
        {
            vin: "YS2R4X20005387765",
            signal: Math.random() >= 0.5
        },
        {
            vin: "YS2R4X20005387055",
            signal: Math.random() >= 0.5
        }
    ])
});

// Start the server
const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);
    console.log(`SIMULATOR Server listening on port ${server.address().port}`);
});