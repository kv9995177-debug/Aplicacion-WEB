const express = require('express');
const app = express();
const mongoose = require('mongoose')
const Cors = require ("cors")
const Morgan = require('morgan')

app.use(Cors({
  origin: "http://localhost:3001", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());
app.use(Morgan("dev"));



// conectar a mongoDb

mongoose.connect('mongodb://localhost:27017/Empresa')
    .then(() => console.log('EL servidor esta conectado a MongoDB'))
    .catch(err => console.error('Error de conexión:', err));




const port = 3000

// definir puerto

app.listen(port, () => {
    console.log('Servidor corriendo en puerto 3000')
});



// importar rutas

const usuariosRoutes = require('./routes/usuarios.routes.js')
const productosRoutes = require('./routes/productos.routes.js')
const loginRoutes = require('./routes/login.routes.js')

// usar rutas

app.use('/api/usuarios', usuariosRoutes)
app.use('/api/productos', productosRoutes)
app.use('/api/usuario', loginRoutes)








