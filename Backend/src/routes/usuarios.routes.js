const express = require('express');
const router = express.Router();
const usuarios = require('../models/usuario');
const controller = require('../controllers/Usuarios.controller')


// Ver Usuarios actuales
router.get('/', controller.getAllUsers)

// Ver usuario por ID 
router.get('/:id', controller.getUserID )

// Insertar 
router.post('/', controller.AddUser )

// actualizar datos de usuario
router.put('/:id', controller.UpUser)

// Eliminar usuario
router.delete('/:id', controller.DeleteUser)




module.exports = router;