const jwt= require("jsonwebtoken");
const User= require('../models/user.js');

module.exports= async (req, res, next)=>{
    if(!req.cookies.token){
        req.flash("failure", "you need to login first");
        return res.status(400).json({failure: req.flash("failure")});
    }
    else{
        try{
            let decoded= jwt.verify(req.cookies.token, "myjwtsecret");
            let user= await User.findOne({email:decoded.email}).select("-password");
            res.locals.user=user;
            next();
        } catch(err){
            req.flash("failure", "something went wrong");
        return res.status(400).json({failure: req.flash("failure")});
        }
    }

}