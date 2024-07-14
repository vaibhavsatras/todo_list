require('dotenv').config()
require('./database/database')
const express = require('express')
const cors = require('cors')
const { router } = require('./routers/userRouter')
const todoRoute = require('./routers/todoRuter')
const app = express()
const PORT = process.env.PORT || 5000

const configCors = {
    origin: "*",
    credential: true,
    methods: ['GET','POST','DELETE']
}

app.options("",cors(configCors))
app.use(cors(configCors))
app.use(express.json())

app.use(express.urlencoded({extended:false}))
app.use('/user',router)
app.use('/todo',todoRoute)


if(process.env.NODE_ENV == 'production')
{
    const path = require('path')

    app.get('/',(req,resp)=>{

        resp.sendFile(path.resolve(__dirname,'front-end','todo-app','build','index.html'))
        
    app.use(express.static(path.resolve(__dirname,'front-end','todo-app','build')))

    })

    
}


app.listen(PORT, ()=>{console.log(`The Servere Is Reunnning on http://localhost:${PORT}`)})
