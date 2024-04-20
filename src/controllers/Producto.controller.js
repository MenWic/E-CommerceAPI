const { Op } = require('sequelize');
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
        await Producto.create({ titulo, descripcion, precio, estado, categoria, aprobado, vendido:false, UsuarioId });
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

// Metodo de compra de producto
const comprarProducto = async (req, res) => {

    try {
        // Extrae el ID del producto de la solicitud
        const { id } = req.body;
  
        // Busca el producto por su ID
        const producto = await Producto.findByPk(id);
  
        // Si el producto no existe, devuelve un error
        if (!producto) {
          return res.status(404).json({ error: 'Producto no encontrado' });
        }
  
        // Intenta cambiar el campo "vendido" a true
        producto.vendido = true;
  
        // Guarda los cambios en la base de datos
        await producto.save();
  
        // Devuelve una respuesta exitosa
        return res.status(200).json({ mensaje: 'Producto comprado exitosamente' });
      } catch (error) {
        // Si ocurre algún error, devuelve un error al cliente
        return res.status(500).json({ error: 'Error al comprar el producto', detalle: error.message });
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

// Función para obtener todos los productos excepto los del usuario por su ID
const productosExceptoDeUsuario = async (req, res) => {
    const usuarioId = req.body.id; //params antes // Obtener el ID del usuario de los parámetros de la solicitud

    try {
        // Buscar todos los productos que no pertenecen al usuario por su ID y que ya fueron Aprobados
        const productos = await Producto.findAll({ where: { UsuarioId: { [Op.ne]: usuarioId }, aprobado:true } });

        // Verificar si se encontraron productos
        if (productos.length > 0) {
            res.json({ productos: productos });
        } else {
            console.log('No se encontraron productos para mostrar.');
            res.json({ mensaje: 'No se encontraron productos para mostrar.' });
        }
    } catch (error) {
        console.error(error);
        console.log('Error interno del servidor');
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

module.exports = {
    // Otras funciones
    productosExceptoDeUsuario
}


// Reporta a un producto de X usuario
/* const reportarProducto =  async (req, res) => {
    const id =  req.body.id;
} */

module.exports = {
    //Funciones
    crearProducto,
    aprobarProducto,
    eliminarProducto,
    productosDesaprobados,
    comprarProducto,

    productosExceptoDeUsuario,

}