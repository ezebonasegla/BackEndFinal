const fs = require ('fs');
const archivo = (`src/dataBase/carritos.txt`);
const CrudArchivo = require (`../../dataBase/crudTxt/crudCarritos`);

class CarritoDAOArchivo extends CrudArchivo {
    constructor() {
        super(archivo, fs);
    }
};

module.exports = CarritoDAOArchivo;