const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    ID :    {type: Number, unique: true},
    Nombre: {type: String, required: true},
    Modelo: {type: String, requirede: true},
    Precio: {type: Number, requirede: true}
})

const producto = mongoose.model('producto', userSchema);

module.exports = producto;