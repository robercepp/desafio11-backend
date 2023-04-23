const Product = require("../models/producto.js");
const User = require("../models/usuario.js");
const bcript = require("bcryptjs");

const root = {
  async getProducts() {
    return await Product.find();
  },

  async getUsers() {
    return await User.find();
  },

  async getProduct(data) {
    const result = await Product.find({ id: data.id });
    return result[0];
  },

  async getUser(data) {
    const result = await User.find({ id: data.id });
    return result[0];
  },

  async createProduct(product) {
    const data = await Product.find({});
    const ids = data.map((producto) => producto.id);
    const idMaximo = Math.max(...ids);
    const createdProduct = new Product({
      nombre: product.nombre,
      precio: product.precio,
      thumbnail: product.thumbnail,
      timestamp: Date.now(),
    });
    if (idMaximo == -Infinity) {
      createdProduct.id = 1;
    } else {
      createdProduct.id = idMaximo + 1;
    }
    const res = await createdProduct.save(); //aquí es donde se salva el producto en MongoDB
    return {
      id: res.id,
      ...res._doc,
    };
  },

  async createUser(user) {
    const findUser = await User.findOne({ email: user.email });
    if (findUser) {
      console.log("ya hay un usuario registrado");
      return null;
    } else {
      const data = await User.find({});
      const ids = data.map((usuario) => usuario.id);
      const idMaximo = Math.max(...ids);
      const encPass = await bcript.hash(user.password, 10);
      var createdUser = new User({
        email: user.email,
        password: encPass,
      });
      if (idMaximo == -Infinity) {
        createdUser.id = 1;
      } else {
        createdUser.id = idMaximo + 1;
      }
      const res = await createdUser.save(); //aquí es donde se salva el usuario en MongoDB
      return {
        id: res.id,
        ...res._doc,
      };
    }
  },

  async deleteProduct(data) {
    const eliminado = (await Product.deleteOne({ id: data.id })).deletedCount;
    return eliminado; //retorna 1 si algo fué eliminado y 0 si nada fué eliminado
  },

  async editProduct(data) {
    const modifiedProduct = {
      nombre: data.productInput.nombre,
      precio: data.productInput.precio,
      thumbnail: data.productInput.thumbnail,
    };
    const editado = (await Product.updateOne({ id: data.id }, modifiedProduct))
      .modifiedCount;
    return editado; //retorna 1 si algo fué editado y 0 si nada fué editado
  },
};

module.exports = { root };
