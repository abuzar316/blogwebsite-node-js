const mongoose = require("mongoose");
const jwt = require('jsonwebtoken')

const userSchema =  new mongoose.Schema({
    email: {
        type:String,
        required:true
    },
    name:{
        type:String,
        required: true
    },
    mobile:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    },
    tokens:[{
        token:{
            type:String
        }
    }]
})

userSchema.methods.generateAuteToken = async function(){
    try {
        const token = jwt.sign({_id:this._id.toString()}, "mynameismohammadabuzarmoradabad");
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    } catch (error) {
        console.log(error);
    }
}

module.exports = mongoose.model("user" , userSchema)