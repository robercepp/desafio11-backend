const { connectDB } = require("../utils/config.js");
const { faker } = require("@faker-js/faker");
faker.locale = "es";
const logger = require("../logger.js");

module.exports = class ProductosDaoDb {
  constructor(model) {
    this.model = model;
  }

  //nota: en este caso, los productos se almacenan en una base de datos de MongoDbAtlas

  async saveProduct(object) {
    try {
      await connectDB();
      const data = await this.model.find({});
      const ids = data.map((producto) => producto.id);
      const idMaximo = Math.max(...ids);
      console.log(idMaximo);
      if (idMaximo == -Infinity) {
        object.id = 1;
        object.timestamp = Date.now();
        await this.model.create(object);
        return null;
      } else {
        object.id = idMaximo + 1;
        object.timestamp = Date.now();
        await this.model.create(object);
        return object;
      }
    } catch (error) {
      logger.error("error!: ", error);
    }
  }

  async getAll() {
    try {
      connectDB();
      const data = await this.model.find({});
      return data
    } catch (error) {
      logger.error(error);
    }
  }

  //randomizador de productos de prueba (faker)
  async randomProducts(cant) {
    let objetos = [];
    for (let i = 0; i < cant; i++) {
      let titulo = await faker.commerce.productName();
      let precio = (Math.floor(Math.random() * 15) + 5).toFixed(2);
      let imgUrl = await faker.image.technics(150, 150, true);
      objetos.push({ title: titulo, price: precio, thumbnail: imgUrl });
    }
    return objetos;
  }
};
