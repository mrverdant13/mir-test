const express = require('express');
const { createVisitor } = require('./controller');

const router = express.Router();

router.get('/', createVisitor);

module.exports = router;
