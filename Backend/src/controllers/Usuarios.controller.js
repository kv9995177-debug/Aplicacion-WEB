const usuarios = require("../models/usuario");

// GET - Obtener todos los usuarios

const getAllUsers = async (req, res) => {
  const usuariosY = await usuarios.find();
  res.json(usuariosY);
};

// GET - Obtener usuario por ID

const getUserID = async (req, res) => {
  const idBuscado = Number(req.params.id);
  const usuariob = await usuarios.findOne({ ID: idBuscado });

  if (!usuariob) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }
  res.json(usuariob);
};

// POST - Añadir nuevo usuario

const AddUser = async (req, res) => {
  try {
    const { Nombre, Correo, Puesto } = req.body;

    // Validación de campos requeridos
    if (!Nombre || !Correo || !Puesto) {
      return res
        .status(400)
        .json({ error: "Debe indicar los campos: Nombre, Correo y Puesto" });
    }

    const ultimo = await usuarios.findOne({}, { ID: 1 }).sort({ ID: -1 });

    const nuevoID = ultimo?.ID ? ultimo.ID + 1 : 1;

    const nuevoUsuario = new usuarios({
      ID: nuevoID,
      Nombre,
      Correo,
      Puesto,
    });

    // Guardar en la base de datos
    const Usuario_Guardado = await nuevoUsuario.save();

    return res.status(201).json(Usuario_Guardado);
  } catch (error) {
    console.error("Error al guardar el usuario:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

// PUT - Actualizar informacion de usuario

const UpUser = async (req, res) => {
  try {
    const idBuscado = Number(req.params.id);
    const { Nombre, Correo, Puesto } = req.body;

    if (!Nombre && !Correo && !Puesto) {
      return res
        .status(400)
        .json({ error: "Debe enviar al menos un campo para actualizar" });
    }

    const camposActualizados = {};
    if (Nombre) camposActualizados.Nombre = Nombre;
    if (Correo) camposActualizados.Correo = Correo;
    if (Puesto) camposActualizados.Puesto = Puesto;

    const usuarioActualizado = await usuarios.findOneAndUpdate(
      { ID: idBuscado },
      { $set: camposActualizados },
      { new: true }
    );

    if (!usuarioActualizado) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.status(200).json(usuarioActualizado);
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// DELETE - Eliminar usuario

const DeleteUser = async (req, res) => {
  idBuscado = Number(req.params.id);

  const usuarioEliminado = await usuarios.findOneAndDelete({ ID: idBuscado });

  // Si no existe el usuario
  if (!usuarioEliminado) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  res
    .status(200)
    .json({
      Mensaje: `El usuario ${usuarioEliminado.Nombre} ha sido eliminado correctamente`,
    });
};

module.exports = {
  getAllUsers,
  getUserID,
  AddUser,
  UpUser,
  DeleteUser,
};
