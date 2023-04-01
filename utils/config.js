require('dotenv').config()
const mongoose = require ('mongoose')
  
persistenceType ="mongo"

  const connectDB = async () => {
    const url = process.env.MONGOURL
    return mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
}

module.exports = {connectDB, persistenceType}