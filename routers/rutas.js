const express = require ('express')
const router = express.Router()
//const {fork} = require ('child_process')
const {calculo} = require ('../numsAleatorios.js')
const logger = require ('../logger.js')

router.get('/', async (req, res) => {
    logger.info(`ruta: '/api/randoms' - método: get peticionada`)
    const { cant } = req.query
    //const child = fork ('./numsAleatorios.js')
    // child.send(parseInt(cant))
    // child.on('message', mensaje =>{
    //     res.render('randoms', {titulo: 'Numeros Aleatorios', lista: mensaje})
    // })
    res.render('randoms', {titulo: 'Numeros Aleatorios', lista: calculo(cant)})
})

module.exports = router;