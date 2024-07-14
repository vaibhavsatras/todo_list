const express = require('express');
const { addTodo, getTodo, deleteTodo } = require('../controlers/todos');
const router = express.Router();
const { userAuth } = require('../middleware/userAuth')

router.post('/addTodo',userAuth,addTodo)
router.get('/getTodo',userAuth,getTodo)
router.delete('/deleteTodo/:id',userAuth,deleteTodo)

module.exports = router