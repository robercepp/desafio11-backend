const RandomsRepo = require("./RandomProductsRepository.js");
const UsuariosMongo = require("./UsuariosRepository.js");
const Singleton = require("../utils/singleton.js");

//de productos
const ProductosDao = require("../daos/ProductosDaoDb.js");
const producto = require("../models/producto.js");
const ProductsDTO = require("../dtos/productosDTO.js");

//de Mensajes
const MensajesDao = require("../daos/ChatDaoDb.js");
const MensajesDTO = require("../dtos/mensajesDTO.js");

function factoryRepository(extention) {
  this.createRepository = function () {
    Singleton.getInstance();
    if (extention) {
      return new Repository(producto, ProductsDTO);
    } else if (!extention) {
      return new Repository(null, MensajesDTO);
    }
  };
  class Repository extends (extention ? ProductosDao : MensajesDao) {
    constructor(schema, DTO) {
      super(schema);
      this.DTO = DTO;
    }
    async listAll() {
      const data = await this.getAll();
      const dtoResponse = new this.DTO(data);
      return dtoResponse.readData();
    }
    async save(product) {
      const dao = new this.DAO();
      const data = await dao.save(product);
      return data;
    }
  }
}

var productDao = new factoryRepository(true).createRepository();
var chatDao = new factoryRepository(false).createRepository();
var randomProducts = new RandomsRepo();
var userDao = new UsuariosMongo();

module.exports = { productDao, userDao, chatDao, randomProducts };
