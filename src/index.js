const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const sequelize = require('./sequelize');

const usuarioRoutes = require('./routes/Usuario.routes');
/*const articuloRuta = require('./rutas/ProductoRuta');
const monedaRuta = require('./rutas/MonedaRuta');
const retiroRuta = require('./rutas/RetiroRuta'); */

/* const tagRuta = require('./rutas/TagRuta');
const compraRuta = require('./rutas/CompraRuta'); */

const path = require("path");
const app = express();

//achivos estaticos 
app.use(express.static(path.join(__dirname, './upload')));

// Acceso de la app en Angular
const corsOptions = {
    origin: 'http://localhost:4200',
    credentials: true,
    optionSuccessStatus: 200,
}
app.use(cors(corsOptions));

// Lectura de JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Inicio de la app
async function start() {
    try {
        await sequelize.authenticate();
        console.log('CONEXION ESTABLECIDA CON LA DB');
        await sequelize.sync({ alter: true, force: true }); // Esto sincronizará los modelos con la base de datos
        app.listen(3000, () => {
            console.log('SERVER ESCUCHANDO EN PORT 3000');
        });
    } catch (error) {
        console.error('ERROR DE CONEXION CON LA DB', error);
    }
}

start(); // Llamamos la función

app.use('/usuario', usuarioRoutes); // Las rutas para los usuarios serán leídas desde localhost/usuario/
/* app.use('/producto', articuloRuta);
app.use('/compra', compraRuta);
app.use('/tags', tagRuta);
app.use('/moneda', monedaRuta);
app.use('/retiro', retiroRuta); */