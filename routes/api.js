const express = require('express');
const router = express.Router();
const {  CreateUser ,getAllUsers,loginUser} = require('../controllers/users');

router.get('/users', getAllUsers);
router.post('/register', CreateUser);
router.post('/login', loginUser);

module.exports = router;
