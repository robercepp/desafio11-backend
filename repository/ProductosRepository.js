const ProductosDao = require ('../daos/ProductosDaoDb.js')
const producto = require("../models/producto.js")
const ProductsDTO = require ('../dtos/productosDTO.js')

module.exports = class ProductosRepository extends ProductosDao {
    constructor() {
        super(producto)
    }
    async listAll() {
            const data = await this.getAll()
            const productosDTO = new ProductsDTO(data)
            return productosDTO.readData();
    }

    async save (product) {
        const data = await this.saveProduct(product)
        return data
    }

    async random(cant) {
        const data = await this.randomProducts(cant)
        return data
    }
}