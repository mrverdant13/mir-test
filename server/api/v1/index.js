const express = require('express');

const visitorsRouter = require('./visitors/routes');

const router = express.Router();

router.use('/', visitorsRouter);

module.exports = router;
