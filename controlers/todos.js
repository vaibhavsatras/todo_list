const todoModel = require("../models/todoSchema")

const addTodo = async(req,resp)=>{

    const {todo} = req.body

    const newTodo = await new todoModel({

        todo:todo,
        createdBy: req.user._id
    })

    const data = await newTodo.save()

    resp.json({message:data})

}

const getTodo = async(req,resp)=>{

    
    const todoList = await todoModel.find({

        createdBy: req.user._id

    })

    resp.json({message:todoList})

}


const deleteTodo = async(req,resp)=>{

    const todo = await todoModel.findByIdAndDelete({_id:req.params.id})
    
    resp.json({message:todo})

}

module.exports = {

    addTodo,
    getTodo,
    deleteTodo

}