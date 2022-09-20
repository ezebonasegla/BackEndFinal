const storage = require('../daos/index')

const productsStorage = storage().carritos;

const getAllProductsByCartId = async (req, res) => {
    try {
        let id = req.params.id;
        const products = await productsStorage.getProductsFromCart(id);
        if (products.length === 0) {
            res.status(404).json({ error: 'No hay productos en el carrito' });
        } else {
            res.status(200).json(products);
        }
    } catch (error) {
        throw new Error(error);
    }
}

const createCart = async (req, res) => {
    try {
        await productsStorage.createCart();
        res.status(201).json('Carrito creado con exito');
    } catch (error) {
        throw new Error(error);
    }
}

const addProduct = async (req, res) => {
    try {
        let id = req.params.id;
        let product = req.body;
        await productsStorage.addProductToCart(id, product);
        res.status(201).json('Producto agregado con exito');
    } catch (error) {
        throw new Error(error);
    }
}

const deleteCartById = async (req, res) => {
    try {
        let id = req.params.id;
        await productsStorage.deleteCart(id);
        res.status(200).json('Carrito eliminado con exito');
    } catch (error) {
        throw new Error(error);
    }
}

const deleteProductById = async (req, res) => {
    try {
        let id = req.params.id;
        let productId = req.params.productId;
        await productsStorage.deleteProductFromCart(id, productId);
        res.status(200).json('Producto eliminado con exito');
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    getAllProductsByCartId,
    createCart,
    addProduct,
    deleteCartById,
    deleteProductById
}