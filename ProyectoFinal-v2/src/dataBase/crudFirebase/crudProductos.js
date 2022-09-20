class Contenedor {
    constructor(queryProductos) {
        this.queryProductos = queryProductos;
    }

    async save(product) {
        try {
            await this.queryProductos.add(product);
            console.log('Producto guardado');
        } catch (error) {
            console.log('Error en save', error);
        }
    }

    async getAll() {
        try {
            const data = await this.queryProductos.get();

            const productos = data.docs.map((doc) => {
                return { id: doc.id, ...doc.data() };
            });
            return productos;

        } catch (error) {
            console.log('Error en getAll', error);
        }
    }

    async getById(id) {
        try {
            const data = await this.queryProductos.doc(id).get();
            
            const producto = { id: data.id, ...data.data() };
            return producto;
        } catch (error) {
            console.log('Error en getById', error);
        }
    }

    async deleteById(id) {
        try {
            await this.queryProductos.doc(id).delete();
            console.log('Producto eliminado');
        } catch (error) {
            console.log('Error en deleteById', error);
        }
    }

    async updateById(id, name, price, thumbnail, description, date, code, stock) {
        try {
            await this.queryProductos.doc(id).update({
                nombre: name,
                precio: price,
                thumbnail: thumbnail,
                descripcion: description,
                timestamp: date,
                codigo: code,
                stock: stock
            });
            console.log('Producto actualizado');
        } catch (error) {
            console.log('Error en updateById', error);
        }
    }
}

module.exports = Contenedor;