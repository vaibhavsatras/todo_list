
const jwt = require('jsonwebtoken')
const {JWT_KEY}  = require('../config/main')


const Authorization = (user)=>{

    const token = jwt.sign({
        _id:user._id,
        name:user.name,
        email:user.email
    },JWT_KEY)

    try {
        
        if(!token) throw new Error('Token Does Not exists...')
            
        return token


    } catch (error) {

        console.log(error.message)
        
    }

}

const Authintication = (tok)=>{

    const user = jwt.verify(tok,JWT_KEY)
    return user
}

module.exports = {

    Authorization,
    Authintication

}