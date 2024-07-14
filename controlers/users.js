const { Authorization } = require("../auth/auth")
const userModel = require("../models/userSchema")

const userSignUp = async (req,resp)=>{

    const {name,email,password,confirmPassword} = req.body

    try {
        
        if(!name && !email && !password && !confirmPassword) throw new Error('Please Enter All Details...')

        const mail = await userModel.findOne({email:email})
        
        if(mail) throw new Error('Mail Address Already Exists...')

        const newUser = await new userModel({

                name:name,
                email:email,
                password:password,
                confirmPassword:confirmPassword

        })

        const data = await newUser.save()
         resp.json({message:"Sign Up Succesfully..."})

    } catch (error) {

        resp.json({error:error.message})
        
    }

    
}

const userSignIn = async (req,resp)=>{

    const {email,password} = req.body

    try {

        if(!email && !password) throw new Error('Please Enter Email address and Password')
        
            const userMatch = await userModel.matchPassword(email,password)

            const token = Authorization(userMatch)

            resp.json({message:token})


    } catch (error) {
        
        resp.json({error:error.message})
    }
    

}


module.exports = {

    userSignUp,
    userSignIn

}