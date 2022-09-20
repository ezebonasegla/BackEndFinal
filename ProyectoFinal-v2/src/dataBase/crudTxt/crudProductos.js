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

    async save(product) {
        try {
            const data = await this.read();
            product.id = data.length + 1;
            data.push(product);
            await this.write(data, 'Producto guardado');
        } catch (error) {
            console.log('Error en save', error);
        }
    }

    async getById(id) {
        try {
            const data = await this.read();
            const product = data.find((product) => product.id === id);
            return product;
        } catch (error) {
            console.log('Error en getById', error);
        }
    }

    async getAll() {
        try {
            const data = await this.read();
            return data;
        } catch (error) {
            console.log('Error en getAll', error);
        }
    }

    async deleteById(id) {
        try {
            const data = await this.read();
            const newData = data.filter((product) => product.id !== id);
            await this.write(newData, 'Producto eliminado');
        } catch (error) {
            console.log('Error en deleteById', error);
        }
    }

    async deleteAll() {
        try {
            await this.write([], 'Productos eliminados');
        } catch (error) {
            console.log('Error en deleteAll', error);
        }
    }
}

module.exports = Contenedor;