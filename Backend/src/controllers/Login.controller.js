const login = require('../models/login');
const bcrypt = require('bcryptjs');         
const jwt = require('jsonwebtoken');        

const JWT_SECRET = 'clave_super_segura_123'; 


// POST - Registro de usuario

const Register = async (req, res) => {
  try {
    const { Usuario, Correo, Contraseña } = req.body;

    
    if (!Usuario || !Correo || !Contraseña) {
      return res.status(400).json({ error: 'Debe enviar Usuario, Correo y Contraseña' });
    }

    
    const usuarioExistente = await login.findOne({ Correo });
    if (usuarioExistente) {
      return res.status(400).json({ error: 'El correo ya está registrado' });
    }

    
    const salt = await bcrypt.genSalt(10);
    const contraseñaEncriptada = await bcrypt.hash(Contraseña, salt);

    
    const nuevoUsuario = new login({
      Usuario,
      Correo,
      Contraseña: contraseñaEncriptada
    });

    await nuevoUsuario.save();

    res.status(201).json({ mensaje: 'Usuario registrado correctamente' });

  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};


// POST - Iniciar sesión

const Login = async (req, res) => {
  try {
    const { Usuario, Contraseña } = req.body;

    // 🛑 1. Validar campos vacíos
    if (!Usuario || !Contraseña) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // 2. Buscar usuario
    const user = await login.findOne({ Usuario });
    if (!user) {
      return res.status(404).json({ error: 'Usuario o Contraseña incorrecta' });
    }

    // 3. Validar contraseña
    const contraseñaValida = await bcrypt.compare(Contraseña, user.Contraseña);
    if (!contraseñaValida) {
      return res.status(401).json({ error: 'Usuario o Contraseña incorrecta' });
    }

    // 4. Crear token
    const token = jwt.sign(
      { id: user._id, usuario: user.Usuario },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    // 5. Respuesta correcta
    return res.status(200).json({
      mensaje: 'Login exitoso',
      token
    });

  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};


module.exports = {
  Register,
  Login
};
