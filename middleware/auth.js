const jwt = require("jsonwebtoken");
const user = require("../models/user");


const auth = async (req,resp,next)=>{
    try {
        const token = req.cookies.jwt;
        // console.log(token);
        const verifyuser = jwt.verify(token , "mynameismohammadabuzarmoradabad");
        const myuser = await user.findOne({_id: verifyuser._id});

        req.token = token;
        req.myuser = myuser;

        next();
    } catch (error) {
        console.log('auth error '+ error);
        resp.redirect("/admin")
    }
}


module.exports = auth;