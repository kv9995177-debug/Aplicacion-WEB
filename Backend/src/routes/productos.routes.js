const express = require('express');
const router = express.Router();
const productos = require('../models/producto');
const controller = require ('../controllers/Productos.controller')


// ver productos actuales
router.get('/', controller.GetAllProducts )

// buscar producto por id
router.get('/:id', controller.GetProductID )


// insertar un producto
router.post('/', controller.AddProduct )


// actualizar datos de un producto
router.put('/:id', controller.UpProduct)


// eliminar usuario
router.delete('/:id', controller.DeleteProduct)



module.exports = router;



