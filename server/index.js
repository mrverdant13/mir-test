const express = require('express');
const cors = require('cors');

const { reqLogger } = require('./logger');
const errorMiddlewares = require('./error.middlewares');
const reqIdSetter = require('./request-id');
const apiV1 = require('./api/v1');

const app = express();

// Enable CORS
app.use(cors());

// // Process JSON payload.
// app.use(express.json());

// Process URL-encoded payload.
app.use(express.urlencoded());

// Set request IDs on each request.
app.use(reqIdSetter);

// Log every incoming request.
app.use(reqLogger);

// Plug API routes into the app.
// Using the V1 implementation as default.
app.use('/', apiV1);
app.use('/api', apiV1);
app.use('/api/v1', apiV1);

// Handle errors.
app.use(...errorMiddlewares);

module.exports = app;
