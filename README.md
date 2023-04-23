# Desafío de Clase 44

El proyecto consta de seguir las pautas especificadas en las rúbricas del desafío a fin de demostrar capacidades y criterio en la implementación de GraphQl.

## Comenzando 🚀

esta entrega está desarrollada de acuerdo con las pautas del desafío de la clase n°44 del curso de Backend de coderhouse. comisión 40280
url: "https://github.com/robercepp/desafios-Backend"

### Pre-requisitos 📋

- Visual studio code (ultima version estable).
- git.
- node (ultima versión estable).
- nodemon (instalado de forma global).

basicamente se trata de descargar el repositorio ya sea desde un pull desde la consola de git o manualmente y luego descomprimiendo.

### Instalación 🔧

Tras haber descargado el repositorio:

- Ejecutar Visual studio code,
- Abrir carpeta raíz del proyecto en visual studio code,
- Abrir una consola nueva,
- Tipear:
```sh
npm install
```
  en la terminal, para descargar todas las dependencias relacionadas con el proyecto.

## Ejecutando las pruebas ⚙️

- Para esta entrega, se disponen las pruebas de la API rest de la siguiente manera:

- Según las rúbricas de la entrega los test de servidor se enfocan en el apartado de manejo de productos. para los cuales se implementa grapthql como método de consultas.

las pruebas radican en el manejo de CRUD de productos mediante un único endpoint en "/grapthql"

al ingresar a "/grapthql" con graphiql activado accedemos al modo visual para realizar las consultas

- Para consultar todos los productos en la base de datos se ingresan lo siguiente: 

```sh
query {
  getProducts {
    id
  }
}
```

![imagen 1](https://github.com/robercepp/desafios-Backend/blob/main/images/1.jpg)

- Para la consulta de un producto según su Id se ingresa lo siguiente:

```sh
query {
  getProduct (id: 1) {
    id
    nombre
    precio
    thumbnail
  }
}
```
![imagen 2](https://github.com/robercepp/desafios-Backend/blob/main/images/2.jpg)

nota: el valor de id representa el id del producto a ser mostrado. 

- Para la creación de un producto nuevo se ingresa lo siguiente a modo de ejemplo:


```sh
mutation {
  createProduct(nombre: "pepe", precio: 15, thumbnail: "https://ichef.bbci.co.uk/news/976/cpsprodpb/16620/production/_91408619_55df76d5-2245-41c1-8031-07a4da3f313f.jpg") {
    id
  }
}
```
![imagen 3](https://github.com/robercepp/desafios-Backend/blob/main/images/3.jpg)

- Para la modificación de un producto ya añadido se especifica el id del producto ya existente y luego se ingresan los valores a modificar. 

```sh
mutation {
  editProduct(id: 5, productInput:{nombre: "ernesto", precio:40, thumbnail:"https://ichef.bbci.co.uk/news/976/cpsprodpb/16620/production/_91408619_55df76d5-2245-41c1-8031-07a4da3f313f.jpg"})
}
```

![imagen 4](https://github.com/robercepp/desafios-Backend/blob/main/images/4.jpg)
este metodo de consulta no retorna el producto en sí, sino un valor booleano. True para una operación exitosa, False para una operación fallida. 

- Para la eliminación de un producto ya creado se especifica el id del producto a eliminar: 

```sh
mutation {
  deleteProduct(id: 5)
}
```
![imagen 5](https://github.com/robercepp/desafios-Backend/blob/main/images/5.jpg)
de la misma forma que en la operación de modificación, esta misma retorna un valor booleano. 

- Las operaciones de consulta de usuarios, usuario único mediante id y creación de usuario también estan disponibles.


## Construido con 🛠️

Visual studio code
express v.4.18.2,
@faker-js/faker v.7.6.0,
axios v.1.3.5
bcryptjs v.2.4.3,
compression v.1.7.4,
connect-mongo v.4.6.0,
cookie-parser v.1.4.6,
express-flash v.0.0.2,
express-hanbdlebars v.6.0.6,
express-graphql v.0.12.0,
express-session v.1.17.3,
graphql v.15.8.0,
mongoose v.6.9.1,
mysql v.2.18.1,
normalizr v.3.6.2,
passport v.0.6.0,
passport-local v.1.0.0,
socket.io v.5.1.4,
sqlite3 v.5.1.4,
yargs v.17.7.0,
winston v.3.8.2

## Autores ✒️

- **Robertino Cepparo** - _Trabajo Inicial_ - [robercepp](https://github.com/robercepp)

## Licencia 📄

Este proyecto está bajo la Licencia (ISC) - (use bajo su propio riesgo)
😊
