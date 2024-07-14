const mongoose = require('mongoose')
const validator = require('email-validator')
const {createHmac,randomBytes} = require('crypto')

const userSchema = new mongoose.Schema({

        name:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true,
            unique: true,
            valid: validator.validate(this.email)

        },
        password:{
            type: String,
            required: true
        },
        confirmPassword:{
            type: String,
            required: true
        },
        salt:{
            type: String
        }

},{timestamps: true})


//User Sign Up Middleware
userSchema.pre('save',function(next){

    const user = this;
    try {

        if(!user) throw new Error('Please Enter Valid User')

    } catch (error) {
        
        console.log(error.message)

    }
    const salt = randomBytes(32).toString('hex')
        const hashPassword = createHmac('sha256',salt).update(user.password).digest('hex')
        const hashConfirmPassword = createHmac('sha256',salt).update(user.confirmPassword).digest('hex')

        try {
            
            if(hashConfirmPassword !== hashPassword) throw new Error('Password Missmatch..')
                this.salt = salt
                 this.password = hashPassword
                this.confirmPassword = undefined
                next()

        } catch (error) {
            
            console.log(error.message)
        }

})


userSchema.static('matchPassword',async function(email,password){

        const user = await this.findOne({email:email})

        try {

            if(!user) throw new Error('Email Address Does not Exists...')
            
            const salt = user.salt
            const oldPassword = user.password

            const newHshPassword = createHmac('sha256',salt).update(password).digest('hex')

            if(oldPassword !== newHshPassword) throw new Error('Password does not Match..');

            return user

        } catch (error) {
            console.log(error.message)
            
        }


})

const userModel = mongoose.model('users',userSchema)

module.exports = userModel