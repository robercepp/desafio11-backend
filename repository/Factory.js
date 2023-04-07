require("dotenv").config();

const ProductosMongo = require("./ProductosRepository.js");
const UsuariosMongo = require("./UsuariosRepository.js");
const ChatDao = require("./ChatRepository.js");
const { DAO } = require("../utils/yargs.js");
const Singleton = require("../utils/singleton.js");

function factoryRepositoy() {

  this.createRepository = function (repo) {
    (Singleton.getInstance());
    if (repo == 'productMongo') {
      return new ProductosMongo()
    } else if (repo == 'userMongo') {
      return new UsuariosMongo()
    }else if (repo == 'chatFile') {
      return new ChatDao()
    }
  } 
}

var factory = new factoryRepositoy()
var productDao = factory.createRepository(DAO || process.env.PRODUCTS_DAO)
var userDao = factory.createRepository(process.env.USERS_DAO)
var chatDao = factory.createRepository(process.env.CHAT_DAO)

module.exports = { productDao, userDao, chatDao };
