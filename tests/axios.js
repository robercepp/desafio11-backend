const axios = require('axios')

async function listProducts () {
  const response = await axios.get('http://localhost:8080/api/productos')
  return response
}

async function listProductById(id) {
    const response = await axios.get(`http://localhost:8080/api/productos/${id}`)
    return response
}

async function saveNewProduct(){
  const response = axios.post('http://localhost:8080/api/productos',{
        nombre: "Cartas a Santa Claus",
        precio: 20,
        thumbnail: "https://www.letterfromsanta.org/img/santa-letter-example-2.jpg"
    })
    return response
}

async function updateProduct(id) {
    const response = axios.put(`http://localhost:8080/api/productos/${id}`,{
    nombre: "Conejos de chocolate",
    precio: 80,
    thumbnail: "https://cdn.shopify.com/s/files/1/0036/3482/3286/products/bunny5oz.1_1200x1200.jpg?v=1528265944"
    })
    return response
}

async function deleteProduct(id) {
  const response = axios.delete(`http://localhost:8080/api/productos/${id}`)
  return response
}

module.exports = {listProducts, listProductById, saveNewProduct, updateProduct, deleteProduct}