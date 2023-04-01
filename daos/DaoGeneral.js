const ProductosMongo = require("./ProductosDaoMongoDb");
const UsuariosMongo = require("./UsuariosDaoMongoDb.js");
const ChatDao = require("./ChatDao.js");
const { persistenceType } = require("../utils/config.js");


let productDao = null;
let userDao = null;
let chatDao = null;

if (persistenceType === "mongo") {
  productDao = new ProductosMongo();
  userDao = new UsuariosMongo();
  chatDao = new ChatDao()
}

module.exports = { productDao, userDao, chatDao };
