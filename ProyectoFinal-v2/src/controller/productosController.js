let administrator = true;

const storage = require('../daos/index')

const productsStorage = storage().productos;

const addProduct = async (req, res) => {
    if (administrator) {
        try {
            const name = req.body.nombre;
            const description = req.body.descripcion;
            const code = Number(req.body.codigo);
            const price = Number(req.body.precio);
            const stock = Number(req.body.stock);
            const thumbnail = req.body.thumbnail;
            const date = new Date().toDateString();
    
            if (name && description && code && price && stock && thumbnail) {
                const product = {
                    timestamp: date,
                    nombre: `${name}`,
                    descripcion: `${description}`,
                    thumbnail: `${thumbnail}`,
                    codigo: code,
                    precio: price,
                    stock: stock,
                }
                await productsStorage.save(product);
                res.status(201).json('Producto agregado con exito');
            } else {
                res.status(400).json({ error: 'Faltan datos' });
            }
        } catch (error) {
            throw new Error(error);
        }
    } else {
        res.status(401).json('No estas autorizado para realizar esta accion');
    }
}

const getAllProducts = async (req, res) => {
    try {
        const products = await productsStorage.getAll();
        if (products.length === 0) {
            res.status(404).json({ error: 'No hay productos cargados' });
        } else {
            res.status(200).json(products);
        }
    } catch (error) {
        throw new Error(error);
    }
}

const getProductById = async (req, res) => {
    try {
        let id = req.params.id;
        const product = await productsStorage.getById(id);
        if (product.length === 0) {
            res.status(404).json({ error: 'Producto no encontrado' });
        } else {
            res.status(200).json(product);
        }
    } catch (error) {
        throw new Error(error);
    }
}

const updateProductById = async (req, res) => {
    if (administrator) {
        try {
            let id = req.params.id;
            const name = req.body.nombre;
            const description = req.body.descripcion;
            const code = Number(req.body.codigo);
            const price = Number(req.body.precio);
            const stock = Number(req.body.stock);
            const thumbnail = req.body.thumbnail;
            const date = new Date().toDateString();
    
            if (name && description && code && price && stock && thumbnail) {
                await productsStorage.updateById(id, name, price, thumbnail, description, date, code, stock);
                res.status(200).json('Producto actualizado con exito');
            } else {
                res.status(400).json({ error: 'Faltan datos' });
            }
        } catch (error) {
            throw new Error(error);
        }
    } else {
        res.status(401).json('No estas autorizado para realizar esta accion');
    }
}

const deleteProductById = async (req, res) => {
    if (administrator) {
        try {
            let id = req.params.id;
            await productsStorage.deleteById(id);
            res.status(200).json('Producto eliminado con exito');
        } catch (error) {
            throw new Error(error);
        }
    } else {
        res.status(401).json('No estas autorizado para realizar esta accion');
    }
}

module.exports = {
    addProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    deleteProductById
}