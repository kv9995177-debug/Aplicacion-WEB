const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
  Usuario: { type: String, required: true },
  Correo: { type:String, required: true },
  Contraseña: { type: String, required: true }
});

const login = mongoose.model('login', loginSchema);

module.exports = login;
