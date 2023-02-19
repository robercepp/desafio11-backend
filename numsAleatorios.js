process.on('message', msg => {
    if(msg) {
        calculo(msg)
    } else {
        calculo(100000000)
    }
})

const calculo = (cant) => {
    let numbers = []
    for(let i=0; i<cant; i++){
        let rand = Math.random() * 1000;
        rand = Math.floor(rand)
        numbers.push(rand)
    }
    const frequency = numbers.reduce((acc, item) =>{
        acc[item] = acc[item] ? acc[item] +1 : 1
        return acc
    }, {})
    process.send(frequency)
    process.exit()
}