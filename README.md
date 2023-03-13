# Desafío de Clase 32

El proyecto consta de seguir las pautas especificadas en las rúbricas del desafío a fin de demostrar capacidades y criterio en el análisis de cargas de servidor en diferentes circunstancias (procesos bloqueantes y no bloqueantes).

## Comenzando 🚀

esta entrega está desarrollada de acuerdo con las pautas del desafío de la clase n°32 del curso de Backend de coderhouse. comisión 40280
url: "https://github.com/robercepp/desafios-Backend"

### Pre-requisitos 📋

- Visual studio code (ultima version estable).
- git.
- node (ultima versión estable).
- nodemon (instalado de forma global).
- Artillery
- Autocannon
- 0x
- Google Chrome

basicamente se trata de descargar el repositorio ya sea desde un pull desde la consola de git o manualmente y luego descomprimiendo.

### Instalación 🔧

Tras haber descargado el repositorio: 
- Ejecutar Visual studio code,
- Abrir carpeta raíz del proyecto en visual studio code,
- Abrir una consola nueva,
- Tipear "npm install" en la terminal, para descargar todas las dependencias relacionadas con el proyecto.

## Ejecutando las pruebas ⚙️

- las pruebas se realizan de la siguiente forma: 

- se incorpora al servidor la compresión gzip
código:
```npm i compression```

- se comprueba la ruta '/info' con y sin compresión, la diferencia de cantidad de bytes devueltos en un caso y otro.

ruta /info sin compresion:
imagen 1

ruta /info con compresion
imagen 2

- se implementa "Winston" como sistema de loggueo registrando todas las peticiones recibidas por el servidor (info)
- las peticiones sobre rutas y métodos inexistentes  en el servidor devuelven un log de warning.
- los errores lanzados por la api en mensajes y productos devuelven un log de error.
- además, los mensajes de error y warning quedan almacenados en los archivos error.log y warn.log respectivamente.

imagen 3

- Consigna 2

- se trabaja sobre la ruta en modo "FORK" agregando un console log sobre la petición del mismo a los efectos de probar su performance con la funcion bloqueante o sin ella. 

- 1 se obtiene el perfilamiento del servidor, realizando el test con --prof de node.js

codigo: 
```node --prof server.js -p 8080 -m FORK```

imagen 4

- luego se analizan los resultados de la performance en ambos casos usando Artillery con 50 conexiones concurrentes de 20 request cada una. 

codigo:
en modo no bloqueante: 
```artillery quick --count 50 -n 20 "http://localhost:8080/info" > result_nobloq.txt```
y luego en modo bloqueante:
```artillery quick --count 50 -n 20 "http://localhost:8080/info" > result_bloq.txt```

imagen 5

los resultados de artillery son:

imagen 7
nota: de los resultados de artillery entendemos que del proceso bloqueante, el tiempo de respuesta media del servidor fué de 135.7ms, mientras que el no bloqueante fué de 127.8ms. de respuesta.

los resultados de los analisis de los archivos procesados con --prof-process son: 

imagen 6
nota: para este caso se observa que el resultado con el proceso bloqueante posee 6255 ticks y para el no bloqueante son de 6090 ticks.

- luego se utiliza autocannon en línea de comandos, emulando 100 conexiones concurrentes realizadas en un tiempo de 20 segundos. los resultados de ambas pruebas se muestran a continuacion: 

código:
```autocannon -c 100 -d 20 "http://localhost:8080/info"```

imagen 8
nota: en este caso, el resultado arrojado por autocannon indica que sin funciones bloqueantes, el tiempo de respuesta del servidor disminuye.

- también se perfila el servidor en modo inspector de node.js --inspect (se revisan los tiempos de los procesos menos performantes sobre el archivo fuente de inspección).
código:
```node --inspect server.js -p 8080 -m FORK```

imagen9
nota: en la imagen de análisis se observa que el proceso bloqueante "console.log(getinfo())" de la línea 193 tiene la mayor carga de tiempo de respuesta con 10.4ms

- se implementa además un diagrama de flama con 0x, emulando la carga con Autocannon con los mismos parámetros anteriores. 

los resultados arrojados son los siguientes:

imagen 10
imagen 11
nota: para el proceso bloqueante si bien no se observa una elevada "temperatura" en el color de los gráficos si se obtiene una demora un poco mayor que si no hubiera un proceso bloqueante. en el gráfico de proceso no bloqueante se observa una respuesta mas rápida, con procesos mas cortos.

## Conclusión

- durante todo el análisis de datos obtenidos por la comparacion en el uso de un proceso bloqueante (console.log()) se observa que el uso desmedido de dichos procesos afectan significativamente la performance del servidor. Si bien en este caso particular la diferencia en tiempos de respuesta no fue tan significativa, se entiende que los servidores mas grandes, con un mayor número de solicitudes y con mayor carga de datos, pueden resultar perjudicados si no se toman en cuenta dichos análisis y se corrigen los cuellos de botella que puedan llegar a generar procesos bloqueantes sobre los mismos.

## Construido con 🛠️

Visual studio code
express v.4.18.2,
@faker-js/faker v.7.6.0,
bcryptjs v.2.4.3,
compression v.1.7.4,
connect-mongo v.4.6.0,
cookie-parser v.1.4.6,
express-flash v.0.0.2,
express-hanbdlebars v.6.0.6,
express-session v.1.17.3,
knex v.2.4.0,
mongoose v.6.9.1,
mysql v.2.18.1,
normalizr v.3.6.2,
passport v.0.6.0,
passport-local v.1.0.0,
socket.io v.5.1.4,
yargs v.17.7.0,
winston v.3.8.2

## Autores ✒️

* **Robertino Cepparo** - *Trabajo Inicial* - [robercepp](https://github.com/robercepp)

## Licencia 📄

Este proyecto está bajo la Licencia (ISC) - (use bajo su propio riesgo)
😊
