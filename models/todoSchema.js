const   mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({

    todo:{
        type: String,
        required: true
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }

},{timestamps:true})

const todoModel = mongoose.model('todos',todoSchema)

module.exports = todoModel