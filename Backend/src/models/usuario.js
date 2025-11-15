const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    ID :    {type: Number, unique: true},
    Nombre: {type: String, required: true},
    Correo: {type: String, required: true},
    Puesto: {type: String, required: true}
})

const Usuario = mongoose.model('usuario', userSchema);
module.exports = Usuario;


