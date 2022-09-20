class Contenedor {
    constructor(queryCarritos, queryProductos, FieldValue) {
        this.queryCarritos = queryCarritos;
        this.queryProductos = queryProductos;
        this.FieldValue = FieldValue;
    }

    async createCart() {
        try {
            let date = new Date();

            const data = await this.queryCarritos.add({
                timestamp: date,
                productos: []
            });
            console.log('Carrito creado');
            return data.id;
        } catch (error) {
            console.log('Error en createCart', error);
        }
    }

    async getProductsFromCart(id) {
        try {
            const data = await this.queryCarritos.doc(id).get();
            const carrito = { id: data.id, ...data.data() };
            return carrito.productos;
        } catch (error) {
            console.log('Error en getProductsFromCart', error);
        }
    }

    async getCartById(id) {
        try {
            const data = await this.queryCarritos.doc(id).get();

            const carrito = { id: data.id, ...data.data() };
            return carrito;
        } catch (error) {
            console.log('Error en getCartById', error);
        }
    }

    async addProductToCart(id, product) {
        try {
            await this.queryCarritos.doc(id).update({
                productos: this.FieldValue.arrayUnion(product)
            });
            console.log('Producto agregado al carrito');
        } catch (error) {
            console.log('Error en addProductToCart', error);
        }
    }

    async deleteProductFromCart(id, productId) {
        try {
            const carrito = await this.getCartById(id);
            const productos = carrito.productos;
            const producto = productos.find((producto) => producto.id === productId);
            const index = productos.indexOf(producto);
            productos.splice(index, 1);
            await this.queryCarritos.doc(id).update({
                productos: productos
            });
            console.log('Producto eliminado del carrito');
        } catch (error) {
            console.log('Error en deleteProductFromCart', error);
        }
    }

    async deleteCart(id) {
        try {
            await this.queryCarritos.doc(id).delete();
            console.log('Carrito eliminado');
        } catch (error) {
            console.log('Error en deleteCart', error);
        }
    }
}

module.exports = Contenedor;