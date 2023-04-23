const logger = require("../logger.js");

const {productDao, randomProducts} = require ('../repository/Factory.js')

async function listAll() {
    const resultado = await productDao.listAll();
    return resultado;
}

async function listAllProducts (req, res) {
    logger.info(`ruta: '${req.url}' - método: get peticionada`);
    const resultado = await productDao.listAll();
    return res.send(resultado);
};

async function listProductById (req, res) {
    const {id} = req.params
    logger.info(`ruta: '${req.url}' - método: get peticionada`);
    const resultado = await productDao.listById(parseInt(id))
    return res.send(resultado)
}

async function createProduct(req, res) {
   logger.info(`ruta: '${req.url}' - método: post peticionada`);
    const resultado = await productDao.save(req.body);
    return res.send(resultado);
};

async function modifyProduct(req, res) {
    const {id} = req.params
   logger.info(`ruta: '${req.url}' - método: put peticionada`);
const resultado = await productDao.modify(req.body, id)
return res.send(resultado)
}

async function deleteProduct(req, res) {
  logger.info(`ruta: '${req.url}' - método: delete peticionada`);
    const resultado = await productDao.delete(req.params.id)
    return res.send(resultado)
}

async function randomizeProducts(cant) {
    if (isNaN(cant)) {
        const resultado = await randomProducts.random(5)
        return resultado
    } else {
        const resultado = await randomProducts.random(cant)
        return resultado
    }

}

module.exports = {listAll, listAllProducts, listProductById, createProduct, randomizeProducts, modifyProduct, deleteProduct}