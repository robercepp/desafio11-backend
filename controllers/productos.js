const {productDao, randomProducts} = require ('../repository/Factory.js')

//productos

async function listAll() {
    const resultado = await productDao.listAll();
    return resultado;
};

async function createProduct(product) {
    const resultado = await productDao.save(product);
    return resultado;
};

async function randomize(cant) {
    if (isNaN(cant)) {
        const resultado = await randomProducts.random(5)
        return resultado
    } else {
        const resultado = await randomProducts.random(cant)
        return resultado
    }

}

module.exports = {listAll, createProduct, randomize}