class Contenedor{
    constructor(mongoDB, productModel){
        this.mongoDB = mongoDB;
        this.productModel = productModel;
    }

    async save(product){
        try{
            let newProduct = new this.productModel(product);
            await newProduct.save();
            return newProduct;
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id){
        try {
            let product = await this.productModel.findById(id);
            return product;
        } catch (error) {
            console.log(error);
        }
    }

    async getAll(){
        try {
            let products = await this.productModel.find();
            return products;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(id){
        try {
            let product = await this.productModel.findByIdAndDelete(id);
            return product;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteAll(){
        try {
            let products = await this.productModel.deleteMany();
            return products;
        } catch (error) {
            console.log(error);
        }
    }

    async updateById(id, nombre, precio, thumbnail, descripcion, date, codigo, stock){
        try {
            let product = await this.productModel.findByIdAndUpdate(id, {
                nombre: nombre,
                precio: precio,
                thumbnail: thumbnail,
                descripcion: descripcion,
                fecha: date,
                codigo: codigo,
                stock: stock
            });
            return product;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Contenedor;