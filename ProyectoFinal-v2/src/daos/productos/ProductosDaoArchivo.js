const fs = require('fs');
const archivo = 'src/dataBase/productos.txt';
const CrudArchivo = require('../../dataBase/crudTxt/crudProductos');

class ProductosDAOArchivo extends CrudArchivo {
    constructor() {
        super(archivo, fs);
    }
}

module.exports = ProductosDAOArchivo;