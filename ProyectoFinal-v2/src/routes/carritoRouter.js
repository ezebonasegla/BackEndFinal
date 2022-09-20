const {
    Router
} = require('express');

const {
    getAllProductsByCartId,
    createCart,
    addProduct,
    deleteCartById,
    deleteProductById
} = require('../controller/carritoController');

const carritoRouter = Router();

carritoRouter.get('/:id', getAllProductsByCartId);
carritoRouter.post('/', createCart);
carritoRouter.post('/:id', addProduct);
carritoRouter.delete('/:id', deleteCartById);
carritoRouter.delete('/:id/:productId', deleteProductById);

module.exports = carritoRouter;