const express = require('express');
const carsRouter = require('./cars/cars-router');

const server = express();
const cors = require('cors');

server.use(express.json());
server.use('/cars', carsRouter);
server.use(cors());

module.exports = server;