const mongoose  = require('mongoose')
const {DB_URI}  = require('../config/main')

const dbConnect = mongoose.connect(DB_URI)

if(dbConnect)
{
    console.log('Database Connected Successfully...')
}
else
{
    console.log('There Is Something Error...')
}

module.exports = dbConnect