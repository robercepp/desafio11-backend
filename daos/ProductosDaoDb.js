const { connectDB } = require("../utils/config.js");
const logger = require("../logger.js");

module.exports = class ProductosDaoDb {
  constructor(model) {
    this.model = model;
  }

  async getAll() {
    try {
      connectDB();
      const data = await this.model.find({});
      return data;
    } catch (error) {
      logger.error(error);
    }
  }

  async save(object) {
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
};
