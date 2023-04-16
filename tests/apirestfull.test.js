const request = require("supertest")("http://localhost:8080/");
const expect = require("chai").expect;

describe("test api rest full", () => {
  describe("Prueba de lectura de productos (GET)", () => {
    it("debería retornar un status 200", async () => {
      let response = await request.get("api/productos");
      expect(response.status).to.eql(200);
    });
  });
  describe("Prueba de lectura de un producto según ID (GET)", () => {
    it("debería retornar un status 200", async () => {
      let response = await request.get("api/productos/1");
      expect(response.status).to.eql(200);
    });
  });
  describe("Prueba de creación de producto nuevo (POST)", () => {
    it("debería retornar un status 200", async () => {
      let productoNuevo = {
        nombre: "Cartas a Santa Claus",
        precio: 20,
        thumbnail:
          "https://www.letterfromsanta.org/img/santa-letter-example-2.jpg",
      };
      let response = await request.post("api/productos").send(productoNuevo);
      expect(response.status).to.eql(200);
      expect(response._body).to.include.keys(
        "nombre",
        "precio",
        "thumbnail",
        "id",
        "timestamp"
      );
      expect(response._body.nombre).to.eql(productoNuevo.nombre);
      expect(response._body.precio).to.eql(productoNuevo.precio);
      expect(response._body.thumbnail).to.eql(productoNuevo.thumbnail);
    });
  });
  describe("Prueba de modificación de producto ya existente (PUT)", () => {
    it("debería retornar un status 200", async () => {
      let productoModificado = {
        nombre: "Conejos de chocolate",
        precio: 80,
        thumbnail:
          "https://cdn.shopify.com/s/files/1/0036/3482/3286/products/bunny5oz.1_1200x1200.jpg?v=1528265944",
      };
      let response = await request.put('api/productos/4').send(productoModificado)
      expect(response.status).to.eql(200);
    });
  });
  describe('Prueba de eliminación de producto según ID (DELETE)', () => {
    it("debería retornar un status 200", async () => {
      let response = await request.delete('api/productos/4')
      expect(response.status).to.eql(200);
    })
  })
});
