const express = require ('express')
const router = express.Router()
const {fork} = require ('child_process')

router.get('/', async (req, res) => {
    const { cant } = req.query
    let numeros = []
    const numsAleatorios = fork ('./numsAleatorios.js')
    numsAleatorios.send(parseInt(cant))
    numsAleatorios.on('message', mensaje =>{
        Object.entries(mensaje).forEach(entry => {
            const [key, value] = entry
            numeros.push({'Numero': key, 'Ocurrencias': value})
        })
        res.render('randoms', {titulo: 'Numeros Aleatorios', lista: numeros})
    })
})

module.exports = router;