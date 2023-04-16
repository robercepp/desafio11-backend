# Desafío de Clase 42

El proyecto consta de seguir las pautas especificadas en las rúbricas del desafío a fin de demostrar capacidades y criterio en el testeo de las funcionalidades del servidor.

## Comenzando 🚀

esta entrega está desarrollada de acuerdo con las pautas del desafío de la clase n°32 del curso de Backend de coderhouse. comisión 40280
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

- Según las rúbricas de la entrega los test de servidor se enfocan en el apartado de manejo de productos. para los cuales se implementan 2 tipos de pruebas.

- nota: todos los módulos de pruebas se encuentran separados y trabajan de forma independiente, dentro de la carpeta /tests

- Se desarrolla un cliente HTTP en Axios que envía peticiones al servidor y prueba la funcionalidad de la api en el listado, carga, modificación, y eliminación de productos.

![imagen 1](https://github.com/robercepp/desafios-Backend/blob/394d21f85efb4524ce4a7f1904364c0872999f13/images/1.jpg)

- Los test se realizan en un modulo independiente dentro del archivo "/tests/tests.js estos se ejecutan mediante un script:

```sh
npm run test-manual
```

estos prueban la capacidad de respuesta del servidor para manejar peticiones de listado, creacion, modificación y eliminación de productos de la base de datos realizados de forma manual.
El manejo de las tareas realizadas quedan listados al completar todas las tareas dejando el informe en consola una vez obtenido un codigo de respuesta "200" por parte del servidor.

![imagen 2](https://github.com/robercepp/desafios-Backend/blob/394d21f85efb4524ce4a7f1904364c0872999f13/images/2.jpg)

como la imagen lo muestra. se puede apreciar una lista con las tareas realizadas y si se completaron o no.
La prueba con su nombre (ej: "lectura de productos") y si esta fue realizada satisfactoriamente (true o false)

- Para la segunda instancia de pruebas de servidor se utilizan modulos específicos como Supertest que maneja peticiones http al servidor dado (en este caso configurado por defecto en "http://localhost:8080/")
para el manejo de pruebas se utiliza en repositiorio "mocha" y para la comprobación de tareas se utiliza el repositiorio "chai"
según se puede apreciar en la siguiente imagen. 

![imagen 3](https://github.com/robercepp/desafios-Backend/blob/394d21f85efb4524ce4a7f1904364c0872999f13/images/3.jpg

- La ejecución de las pruebas mediante "mocha" se realizan también por script de package.json mediante el siguiente comando: 
```sh
npm run test
```
Este hace un llamado al repositorio que a su vez ejecuta peticiones de supertest a las terminales asociadas al CRUD de productos y luego las comprueba con "chai" para determinar su correcta implementación. 

En estas pruebas también se verifica que el servidor retorne un estado "200" en todos los casos de lectura, creación, modificación y eliminación de productos. 

Al terminar las pruebas, la consola escribe un resumen de las tareas realizadas y si estas se concretaron. 

![imagen 4](https://github.com/robercepp/desafios-Backend/blob/394d21f85efb4524ce4a7f1904364c0872999f13/images/4.jpg)

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
express-session v.1.17.3,
mongoose v.6.9.1,
mysql v.2.18.1,
normalizr v.3.6.2,
passport v.0.6.0,
passport-local v.1.0.0,
socket.io v.5.1.4,
sqlite3 v.5.1.4,
yargs v.17.7.0,
winston v.3.8.2

dependencias de desarrollo:
chai v.4.3.7
dotenv v.16.0.3
mocha v.10.2.0
supertest v.6.3.3

## Autores ✒️

- **Robertino Cepparo** - _Trabajo Inicial_ - [robercepp](https://github.com/robercepp)

## Licencia 📄

Este proyecto está bajo la Licencia (ISC) - (use bajo su propio riesgo)
😊
