const dbhandler = require ('../classes/dbhandler.js')
const producto = require("../models/producto.js")

module.exports = class ProductosDaoMongoDb extends dbhandler {
    constructor() {
        super(producto)
    }
    async listAll() {
            const data = await this.getAll()
            return data;
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