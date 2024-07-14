const mongoose  = require('mongoose')
const {DB_URI}  = require('../config/main')

const dbConnect = mongoose.connect(DB_URI)

mongoose.connection.on('connected',()=>{

    console.log('Database Connected Successfully...')

})

mongoose.connection.on('error',(error)=>{

    console.log('There Is something Error...',error.message)

})

module.exports = dbConnect