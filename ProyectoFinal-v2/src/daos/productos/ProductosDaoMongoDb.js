const mongoDB = require('../../dataBase/options/mongoDB');
const productoModel = require('../../dataBase/models/producto');

const CrudMongoDB = require('../../dataBase/CrudMongoDB/crudProductos');

class ProductosDAOMongoDB extends CrudMongoDB {
    constructor() {
        super(mongoDB, productoModel);
    }
}

module.exports = ProductosDAOMongoDB;