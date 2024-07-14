const express = require('express')
const { userSignUp, userSignIn } = require('../controlers/users')
const router = express.Router()

router.post('/signUp',userSignUp)
router.post('/signIn',userSignIn)


module.exports = {

    router
}