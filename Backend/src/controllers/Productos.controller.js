const productos = require('../models/producto');

// Get - Obtener todos los productos

const GetAllProducts = async (req, res) => {
    const productoI = await productos.find();
    res.json(productoI)
}

// Get - Obtener producto por ID


const GetProductID = async (req, res) => {
    const idBuscado = Number(req.params.id);

    const producto = await productos.findOne({ ID: idBuscado });

    if (!producto) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json(producto);
}


// Post - Añadir un producto 

const AddProduct = async (req, res) => {
    const ultimoProducto = await productos.findOne().sort({ ID: -1 }).limit(1);
    const nuevoID = ultimoProducto ? ultimoProducto.ID + 1 : 1;

    const { Nombre, Modelo, Precio } = req.body;

    if (!Nombre || !Modelo || !Precio) {
        return res.status(400).json({ error: "Debe indicar los campos: Nombre, Modelo y Precio" });
    }

    const NuevoProducto = new productos({
        ID: nuevoID,
        Nombre,
        Modelo,
        Precio
    });

    const Producto_Guardado = await NuevoProducto.save();
    res.status(201).json(Producto_Guardado);
}

// PUT - Actualizar datos de un producto

const UpProduct = async (req, res) => {
    const idBuscado = Number(req.params.id);
    const { Nombre, Modelo, Precio } = req.body;

    if (!Nombre && !Modelo && !Precio) {
        return res.status(400).json({ error: "Debe enviar al menos un campo para actualizar" });
    }

    const camposActualizados = {};
    if (Nombre) camposActualizados.Nombre = Nombre;
    if (Modelo) camposActualizados.Modelo = Modelo;
    if (Precio) camposActualizados.Precio = Precio;

    const productoActualizado = await productos.findOneAndUpdate(
        { ID: idBuscado },
        { $set: camposActualizados },
        { new: true }
    );

    if (!productoActualizado) {
        return res.status(404).json({ error: `No se encontró producto con ID ${idBuscado}` });
    }

    res.status(200).json(productoActualizado);

}


// DELETE - Eliminar un producto

const DeleteProduct = async (req, res) => {
    const idBuscado = Number(req.params.id); 
    const productoEliminado = await productos.findOneAndDelete({ ID: idBuscado });

    if (!productoEliminado) {
        res.json({ Error : `Producto con ID (${idBuscado}) no encontrado`})
    }

     res.status(200).json({ mensaje: `Producto '${productoEliminado.Nombre}' eliminado correctamente` });
}



module.exports = {
    GetAllProducts,
    GetProductID,
    AddProduct,
    UpProduct,
    DeleteProduct

}


