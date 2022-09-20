class Contenedor {
    constructor(archivo, fs) {
        this.archivo = archivo;
        this.fs = fs;
    }

    async read() {
        try {
            const data = await this.fs.promises.readFile(this.archivo, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.log('Error en read', error);
        }
    }

    async write(data, msg) {
        try {
            await this.fs.promises.writeFile(this.archivo, JSON.stringify(data, null, 2));
            console.log(msg);
        } catch (error) {
            console.log('Error en write', error);
        }
    }

    async createCart() {
        try {
            const data = await this.read();
            const newCart = {
                id: data.length + 1,
                timestamp: Date.now(),
                productos: []
            }
            data.push(newCart);
            await this.write(data, 'Carrito creado');
            return newCart.id;
        } catch (error) {
            console.log('Error en createCart', error);
        }
    }

    async getProductsFromCart(id) {
        try {
            const data = await this.read();
            let result = data.filter(cart => cart.id == id);
            if (result.length == 0) {
                return [];
            } else {
                return result[0].products;
            }

        } catch (error) {
            console.log('Error en getProductsFromCart', error);
        }
    }

    async getCartById(id) {
        try {
            const data = await this.read();
            const cart = data.find((cart) => cart.id === id);
            return cart;
        } catch (error) {
            console.log('Error en getCartById', error);
        }
    }

    async getAllCarts() {
        try {
            const data = await this.read();
            return data;
        } catch (error) {
            console.log('Error en getAllCarts', error);
        }
    }

    async deleteCartById(id) {
        try {
            const data = await this.read();
            const newData = data.filter((cart) => cart.id !== id);
            await this.write(newData, 'Carrito eliminado');
        } catch (error) {
            console.log('Error en deleteCartById', error);
        }
    }

    async deleteProductFromCart(idCart, idProduct) {
        try {
            const data = await this.read();
            let result = data.filter(cart => cart.id == idCart);
            if (result.length == 0) {
                return [];
            } else {
                let newProducts = result[0].products.filter(product => product.id != idProduct);
                result[0].products = newProducts;
                await this.write(data, 'Producto eliminado del carrito');
                return result[0].products;
            }
        } catch (error) {
            console.log('Error en deleteProductFromCart', error);
        }
    }

    async deleteAllCarts() {
        try {
            await this.write([], 'Todos los carritos eliminados');
        } catch (error) {
            console.log('Error en deleteAllCarts', error);
        }
    }
}

module.exports = Contenedor;