const {productDao} = require ('../daos/DaoGeneral.js')

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
        const resultado = await productDao.random(5)
        return resultado
    } else {
        const resultado = await productDao.random(cant)
        return resultado
    }

}

module.exports = {listAll, createProduct, randomize}