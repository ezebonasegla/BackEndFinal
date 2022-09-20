const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// Routers
const productosRouter = require('../ProyectoFinal-v2/src/routes/productosRouter');
const carritoRouter = require('../ProyectoFinal-v2/src/routes/carritoRouter');

app.use('/api/productos', productosRouter);
app.use('/api/carritos', carritoRouter);

app.use((err, req, res, next) => {
    console.error(err.message);
    return res.status(500).send('Algo se rompió!');
});

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

server.on('error', error => {
    console.log('Error en servidor', error);
});