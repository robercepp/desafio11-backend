//variables de entorno
require("dotenv").config();

//librerías requeridas
const express = require("express");
const app = express();
const routes = require("./routers/routes.js");
var server = require("http").createServer(app);
var io = require("socket.io")(server);
require("./utils/socketService.js")(io);
const { engine } = require("express-handlebars");
const passport = require("passport");
const flash = require("express-flash");
const yargs = require("yargs/yargs")(process.argv.slice(2));
const cluster = require("cluster");
const logger = require("./logger.js");
const numCPUs = require("os").cpus().length;

//sesiones
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

//engine handlebars
app.engine(
  "hbs",
  engine({
    defaultLayout: false,
  })
);

//middlewares
app.set("view engine", "hbs");
app.set("views", "./views");
app.use(express.static("public"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.MONGOURL,
      mongoOptions: advancedOptions,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 600000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

//Uso de Yargs para determinar el puerto del servidor
const { PORT, mode } = yargs
  .alias({
    p: "PORT",
    m: "mode",
  })
  .default({
    PORT: process.env.PORT || 8080,
    mode: "FORK",
  }).argv;

if (mode == "CLUSTER") {
  if (cluster.isMaster) {
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
    logger.info(`Proceso Maestro: ${process.pid}`);
    cluster.on("exit", (worker, code, signal) => {
      logger.info(`el worker ${worker.process.pid} se ha cerrado`);
    });
  } else {
    iniciarServidor();
  }
} else {
  iniciarServidor();
}

//servidor
function iniciarServidor() {
  const connectServer = server.listen(PORT, () =>
    logger.info(
      `Servidor Express con WebSocket iniciado en modo ${mode} escuchando el puerto ${
        connectServer.address().port
      } - Proceso N° ${process.pid}`
    )
  );
  connectServer.on("error", (error) =>
    logger.error(`Error en servidor ${error}`)
  );
}

//passport
const {findUser, findUserById} = require ('./controllers/usuarios.js')
const initializePassport = require("./config/passport.js");
initializePassport(
  passport,
  (email) => findUser(email),
  (id) => findUserById(id)
);

//rutas
app.use("/", routes);

