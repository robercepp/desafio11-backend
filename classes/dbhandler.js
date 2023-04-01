const fs = require("fs");
const { connectDB } = require("../utils/config.js");
const { faker } = require("@faker-js/faker");
faker.locale = "es";
const logger = require("../logger.js");

//normalizr
const normalizr = require("normalizr");
const normalize = normalizr.normalize;
const denormalize = normalizr.denormalize;
const schema = normalizr.schema;
//util
const util = require("util");

module.exports = class DBHandler {
    constructor(model) {
        this.model = model
    }

  async fileChecker() {
    const fileStructure = `
        [
            {
                "id": "mensajes",
                "mensajes": [

                ]
            }
        ]
        `;
    if (!fs.existsSync("./DB/chats.txt")) {
      try {
        await fs.promises.writeFile("./DB/chats.txt", fileStructure);
      } catch (error) {
        logger.error("error!: ", error);
      }
    }
  }

  async saveChat(object) {
    await this.fileChecker();
    try {
      const datos = await fs.promises.readFile("./DB/chats.txt", "utf-8");
      const data = JSON.parse(datos);
      const ids = data[0].mensajes.map((mensajes) => mensajes.id);
      const idMaximo = Math.max(...ids);
      object.id = idMaximo + 1;
      data[0].mensajes.push(object);
      await fs.promises.writeFile(
        "./DB/chats.txt",
        JSON.stringify(data, null, 2)
      );
    } catch (error) {
      logger.error("error!: ", error);
    }
  }

  async getChat() {
    await this.fileChecker();
    try {
      const datos = await fs.promises.readFile("./DB/chats.txt", "utf-8");
      const data = JSON.parse(datos);

      //normalización de datos
      const author = new schema.Entity(
        "authors",
        {},
        {
          idAttribute: "id",
        }
      );
      const mensaje = new schema.Entity("mensajes", {
        author: author,
      });
      const chat = new schema.Entity("chat", {
        mensajes: [mensaje],
      });
      const normalizedData = normalize(data[0], chat);
      const normalizedDataJSON = JSON.stringify(normalizedData);
      //se envían datos normalizados al frontend
      return normalizedDataJSON;
    } catch (error) {
      logger.error("error!: ", error);
    }
  }

  print(objeto) {
    console.log(util.inspect(objeto, true, 12, true));
  }

  //nota: en este caso, los productos se almacenan en una base de datos de MongoDbAtlas

  async saveProduct(object) {
    try {
      await connectDB();
      const data = await this.model.find({});
      const ids = data.map((producto) => producto.id);
      const idMaximo = Math.max(...ids);
      console.log(idMaximo)
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
      return data;
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
      objetos.push({title: titulo, price: precio, thumbnail: imgUrl})
    }
    return objetos;
  }
};
