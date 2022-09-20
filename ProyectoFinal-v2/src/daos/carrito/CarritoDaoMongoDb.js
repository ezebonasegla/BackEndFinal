const mongoDB = require('../../dataBase/options/mongoDB');

const carritoModel = require('../../dataBase/models/carrito');
const productoModel = require('../../dataBase/models/producto');

const CrudMongoDB = require('../../dataBase/CrudMongoDB/crudCarritos');

class CarritoDAOMongoDB extends CrudMongoDB {
    constructor() {
        super(mongoDB, carritoModel, productoModel);
    }
}

module.exports = CarritoDAOMongoDB;