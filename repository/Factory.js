require("dotenv").config();

const RandomsRepo = require ('./RandomProductsRepository.js')
const ProductosMongo = require("./ProductosRepository.js");
const UsuariosMongo = require("./UsuariosRepository.js");
const ChatDao = require("./ChatRepository.js");
const { DAO } = require("../utils/yargs.js");
const Singleton = require("../utils/singleton.js");

function factoryRepositoy() {

  this.createRepository = function (repo) {
    (Singleton.getInstance());
    if (repo == 'productos') {
      return new ProductosMongo()
    } else if (repo == 'usuarios') {
      return new UsuariosMongo()
    }else if (repo == 'mensajes') {
      return new ChatDao()
    }
  } 
}

var factory = new factoryRepositoy()
var randomProducts = new RandomsRepo()
var productDao = factory.createRepository('productos')
var userDao = factory.createRepository('usuarios')
var chatDao = factory.createRepository('mensajes')


module.exports = { productDao, userDao, chatDao, randomProducts };