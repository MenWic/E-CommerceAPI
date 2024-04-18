const Producto = require('../models/Producto');
const Usuario = require('../models/Usuario'); // Importar el modelo Usuario definido en Sequelize
const bcrypt = require('bcrypt');

// Función para registrar un nuevo Usuario
const crearProducto = async (req, res) => {
    //const imagen = req.body.aprobado;
    const titulo = req.body.titulo;
    const descripcion = req.body.descripcion;
    const precio = req.body.precio;
    const estado = req.body.estado;
    const categoria = req.body.categoria;
    const aprobado = req.body.aprobado;
    const UsuarioId = req.body.UsuarioId;

    // Verificar que no esten vacios
    if (!titulo || !descripcion || !precio || !estado || !categoria) {
        res.json({ respuesta: false });
        return;
    }
    try {
        // Crear el usuario en la base de datos
        await Producto.create({ titulo, descripcion, precio, estado, categoria, aprobado, UsuarioId });
        res.json({ respuesta: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ respuesta: false });
    }
}

// Elimna a un producto del usuario
const eliminarProducto = async (req, res) => {
    const id = req.body.UsuarioId;
    
    try {
        // Buscar el producto por ID en la base de datos
        const producto = await Producto.findByPk(id); //findById

        if (!producto) {
            return res.json({ error: 'Producto: '+id+' no encontrado' });
        }
    
        // Actualizar la base de datos
        await producto.destroy();

        res.json({Mensaje: "Se elimino el producto "}); // Devolver el producto eliminado como respuesta
    } catch (error) {
    
        console.error('Error al eliminar producto: ', error);
        res.json({ error: 'Error interno del servidor' });
    }
}

// Cambia el estado de un producto
const aprobarProducto = async (req, res) => {
    const id = req.body.id;
    
    try {
        // Buscar el producto por ID en la base de datos
        const producto = await Producto.findByPk(id); //findById

        if (!producto) {
            return res.json({ error: 'Producto: '+id+' no encontrado' });
        }

        // Actualizar el campo "aprobado" del producto a true
        producto.aprobado = true;
    
        // Guardar el producto actualizado en la base de datos
        await producto.save();

        res.json(producto); // Devolver el poducto actualizado como respuesta
    } catch (error) {
    
        console.error('Error al aprobar producto: ', error);
        res.json({ error: 'Error interno del servidor' });
    }
}

// Productos desaprobados de los usuarios
const productosDesaprobados = async (req, res) => {
    try {
        // 1) Buscar producto cuyo campo aporbado sea falso 
        const productosDesaprobados = await Producto.findAll({ where: { aprobado:false } });

        // 2) Asignamos el/los producto(s) obtenidos a la const
            res.json({ productosDesaprobados:productosDesaprobados });
    } catch (error) {
        console.error([error]);
        res.json([]);
    }
}

// Reporta a un producto de X usuario
/* const reportarProducto =  async (req, res) => {
    const id =  req.body.id;
} */

module.exports = {
    //Funciones
    crearProducto,
    eliminarProducto,
    productosDesaprobados,
    aprobarProducto,
}