const express = require('express');
const { getUsers, showForm, registerUser } = require('./controller');

const router = express.Router();

router.get('/', getUsers);
router.get('/register', showForm);
router.post('/register', registerUser);

module.exports = router;
