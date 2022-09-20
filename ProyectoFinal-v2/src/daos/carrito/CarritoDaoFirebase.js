const { queryCarritos, queryProductos, FieldValue } = require('../../dataBase/options/firebaseDB');
const CrudFirebase = require('../../dataBase/CrudFirebase/crudCarritos');

class CarritoDAOFirebase extends CrudFirebase {
    constructor() {
        super(queryCarritos, queryProductos, FieldValue);
    }
}

module.exports = CarritoDAOFirebase;