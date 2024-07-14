const { Authintication } = require("../auth/auth")


const userAuth = (req,resp,next)=>{

    const token = req.headers['authorization']
    
    try {
        
        if(!token) throw new Error('Token Is Invalid')
        
        const user = Authintication(token)

        if(!user) throw new Error('User Token Invalid...')
        
        req.user = user

        
        next()

        return user

    } catch (error) {

        console.log(error.message)
        
    }

}

module.exports = {
    userAuth
}