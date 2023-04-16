const {
  listProducts,
  listProductById,
  saveNewProduct,
  updateProduct,
  deleteProduct,
} = require("./axios.js");

const Todos = require("./todos.js");
const todos = new Todos();

async function listarProductos() {
  todos.add("Lectura de Productos");
  const response = await listProducts();
  if (response.status === 200) {
    todos.complete("Lectura de Productos");
  } else {
    console.log(todos.list());
  }
}

async function listarProductoPorId() {
  todos.add("Lectura de Producto por ID");
  const response = await listProductById(1);
  if (response.status === 200) {
    todos.complete("Lectura de Producto por ID");
  } else {
    console.log(todos.list());
  }
}

async function guardarProducto() {
  todos.add("Guardar Producto Nuevo");
  const response = await saveNewProduct();
  if (response.status === 200) {
    todos.complete("Guardar Producto Nuevo");
  } else {
    console.log(todos.list());
  }
}

async function modificarProducto() {
  todos.add("Modificar producto existente");
  const response = await updateProduct(4);
  if (response.status === 200) {
    todos.complete("Modificar producto existente");
  } else {
    console.log(todos.list());
  }
}

async function quitarProducto() {
  todos.add("Quitar un Producto existente");
  const response = await deleteProduct(4);
  if (response.status === 200) {
    todos.complete("Quitar un Producto existente");
  } else {
    console.log(todos.list());
  }
}

listarProductos()
  .then(() => listarProductoPorId())
  .then(() => guardarProducto())
  .then(() => modificarProducto())
  .then(() => quitarProducto())
  .then(()=> console.log(todos.list()))


