const logger = require("../logger.js");
const { getAllChats, saveChat } = require("../controllers/chat.js");
const { listAll, createProduct} = require("../controllers/productos.js");
const {getInfo} = require ("../utils/systemInfo.js")

//"connection" se ejecuta la primera vez que se abre una nueva conexion
module.exports = (io) => {
  io.on("connection", async (socket) => {
    logger.info("Nuevo cliente conectado");
    //Envio de los mensajes al cliente que se conecto
    socket.emit("mensajes", await getAllChats());
    socket.emit("mensaje", await getAllChats());
    socket.emit("productos", await listAll());
    socket.emit("producto", await listAll());
    socket.emit("info", getInfo());
    //Escucho los mensajes enviados por el cliente
    socket.on("new-message", async (data) => {
      await saveChat(data);
      io.sockets.emit("mensaje", await getAllChats());
    });
    socket.on("new-producto", async (data) => {
      await createProduct(data);
      io.sockets.emit("producto", await listAll());
    });
  });
};
