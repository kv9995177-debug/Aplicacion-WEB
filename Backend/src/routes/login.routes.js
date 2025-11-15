const express = require('express');
const router = express.Router();
const login = require('../models/login');
const controller = require('../controllers/Login.controller')

// Registrar nuevo usuario 
router.post('/register', controller.Register )

// Iniciar sesión
router.post('/login', controller.Login)


module.exports = router;
