const ProductosDAOFirebase = require('../daos/productos/ProductosDAOFirebase');
const CarritoDAOFirebase = require('../daos/carrito/CarritoDAOFirebase');

const ProductosDAOMongoDB = require('../daos/productos/ProductosDAOMongoDB');
const CarritoDAOMongoDB = require('./carrito/CarritoDAOMongoDB');

const ProductosDAOArchivo = require('../daos/productos/ProductosDAOArchivo');
const CarritoDAOArchivo = require('./carrito/CarritoDAOArchivo');

const getStorage = () => {

    const storage = 'mongodb';

    if (storage === 'firebase') {
        return {
            productos: new ProductosDAOFirebase(),
            carritos: new CarritoDAOFirebase()
        }
    } else if (storage === 'mongodb') {
        return {
            productos: new ProductosDAOMongoDB(),
            carritos: new CarritoDAOMongoDB()
        }
    } else {
        return {
            productos: new ProductosDAOArchivo(),
            carritos: new CarritoDAOArchivo()
        }
    }
}

module.exports = getStorage;