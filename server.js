//variables de entorno
if (process.env.NODE_ENV !== "production") {
    require('dotenv').config()
}

//librerías requeridas
const express = require('express');
const app = express();
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const { engine } = require('express-handlebars');
const passport = require('passport')
const flash = require('express-flash')
const yargs = require('yargs/yargs')(process.argv.slice(2))
const cluster = require('cluster')
const numCPUs = require('os').cpus().length
const compression = require('compression')
const logger = require('./logger.js')

const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

//sesiones
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }

const mariaDB = require('./options/mariaDB.js');
const sqLite = require('./options/sqLite.js')

//engine handlebars
app.engine('hbs', engine({
    defaultLayout: false
}))

//middlewares
app.set("view engine", "hbs");
app.set("views", "./views")
app.use(express.static('public'))
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(flash())
app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGOURL,
        mongoOptions: advancedOptions
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie:
    {
        maxAge: 600000
    }
}))
app.use(passport.initialize())
app.use(passport.session())

//Uso de Yargs para determinar el puerto del servidor
const { PORT, mode } = yargs
    .alias({
        p: 'PORT',
        m: 'mode'

    })
    .default({
        PORT: 8080,
        mode: 'FORK'
    })
    .argv

if (mode == "CLUSTER") {
    if (cluster.isMaster) {
        for (let i = 0; i < numCPUs; i++) {
            cluster.fork()
        }
        console.log(`Proceso Maestro: ${process.pid}`)
        cluster.on('exit', (worker, code, signal) => {
            console.log(`el worker ${worker.process.pid} se ha cerrado`)
        })
    } else {
        iniciarServidor()
    }
} else {
    iniciarServidor()
}


//servidor
function iniciarServidor() {
    const connectServer = httpServer.listen(PORT, () => console.log(`Servidor Express con WebSocket iniciado en modo ${mode} escuchando el puerto ${connectServer.address().port} - Proceso N° ${process.pid}`))
    connectServer.on("error", error => console.log(`Error en servidor ${error}`))
}


//conexion a mongoDb
const mongoUrl = process.env.MONGOURL

//class
const userHandler = require('./classes/userHandler.js')
const dBHandler = require("./classes/dbhandler.js")
const chat = new dBHandler(sqLite.options, 'mensajes')
const prod = new dBHandler(mariaDB.options, 'productos')
const usr = new userHandler(mongoUrl)

//"connection" se ejecuta la primera vez que se abre una nueva conexion
io.on('connection', async (socket) => {
    logger.info('Nuevo cliente conectado')
    //Envio de los mensajes al cliente que se conecto
    socket.emit('mensajes', await chat.getChat())
    socket.emit('mensaje', await chat.getChat())
    socket.emit('productos', await prod.getAll())
    socket.emit('producto', await prod.getAll())
    socket.emit('productos-random', await prod.randomProducts())
    socket.emit('info', getInfo())
    //Escucho los mensajes enviados por el cliente
    socket.on('new-message', async (data) => {
        await chat.saveChat(data)
        io.sockets.emit('mensaje', await chat.getChat())
    })
    socket.on('new-producto', async (data) => {
        await prod.saveProduct(data)
        io.sockets.emit('producto', await prod.getAll())
    })
})

//passport
const initializePassport = require('./config/passport.js')
initializePassport(
    passport,
    email => usr.findUserByMail(email),
    id => usr.findUserById(id),
)

app.get('/api/productos-test', auth, async (req, res) => {
    logger.info(`ruta: '/api/productos-test' - método: get peticionada`)
    const { cant } = req.query
    res.render('test', { titulo: 'Pruebas de Productos aleatorios', lista: await prod.randomProducts(parseInt(cant)) })
})

app.get('/', auth, async (req, res) => {
    logger.info(`ruta: '/' - método: get peticionada`)
    res.render('main', { email: req.user.email, titulo: 'Pagina principal', lista: prod.getAll(), mensajes: chat.getAll() })

})

app.get('/login', notAuth, (req, res) => {
    logger.info(`ruta: '/login' - método: get peticionada`)
    res.render('login', { titulo: 'Login de usuario' })
})

app.post('/login', notAuth, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))


app.get('/register', notAuth, (req, res) => {
    logger.info(`ruta: '/register' - método: get peticionada`)
    res.render('register', { titulo: 'Registro de usuario nuevo' })
})

app.post('/register', notAuth, async (req, res) => {
    logger.info(`ruta: '/register' - método: post peticionada`)
    if (usr.findUserById(req.body.email)) {
        res.render('register', { titulo: 'Registro de usuario nuevo', error: 'El usuario ya existe' })
    } else {
        try {
            usr.saveUser(req.body.email, req.body.password)
            res.redirect('/login')
        } catch {
            res.redirect('/register')
        }
    }
})

app.get('/logout', auth, (req, res) => {
    logger.info(`ruta: '/logout' - método: get peticionada`)
    res.render('logout', { usuario: req.user.email, titulo: 'cierre de sesión' })
})

app.get('/exit', auth, (req, res) => {
    logger.info(`ruta: '/exit' - método: get peticionada`)
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    })
})

app.get('/info', (req, res) => {
    logger.info(`ruta: '/info' - método: get peticionada`)
    res.render('info', { titulo: 'Info del Proceso' })
})

const routes = require('./routers/rutas.js')

app.use('/api/randoms', routes)

app.get('*', (req, res) => {
    logger.warn(`Error: 404 ruta no encontrada`)
    res.json({ 'error': 'error 404, ruta no encontrada' })
})

function auth(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    } else {
        return res.redirect('/login')
    }

}

function notAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    return next()
}

function getInfo() {
    const args = process.argv.slice(2)
    const plat = process.platform
    const version = process.version
    const memoria = process.memoryUsage().rss
    const exe = __dirname
    const path = process.cwd()
    const id = process.pid
    const info = {
        args, plat, version, memoria, exe, id, path, numCPUs
    }
    return info
}