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

async function randomize(cant){
    const resultado = await productDao.random(cant)
    return resultado
}

module.exports = {listAll, createProduct, randomize}