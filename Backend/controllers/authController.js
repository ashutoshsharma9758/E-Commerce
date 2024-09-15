const User=require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const register=async (req,res)=>{
    try{
        const {name, email, password} = req.body;
        let user= await User.findOne({email: email});
        if(user){
            return res.status(400).json({message: "You already have an account, please login"});
        }
        bcrypt.genSalt(10, function(err, salt){
            bcrypt.hash(password, salt, async function (err, hash){
                if(err){
                    return res.status(400).json({message: err.message});
                }
                else{
                    let user = await User.create({
                        email,
                        password:hash,
                        name,
                    });
                    let token = jwt.sign({email, id:user._id}, "myjwtsecret");
                    res.cookie("token", token,{
                        httpOnly: true,
                        secure: false, // Set to true if using HTTPS
                        sameSite: 'Lax',
                        domain: 'localhost', // Ensure the domain is correct
                        path: '/' 
                      });
                    if(!req.cookies.token){
                        console.log("cookie is not set");
                    }
                    else{
                        console.log("cookie is set");
                    }
                    console.log(`the token is ${token}`);
                    return res.status(200).json({message: "sccessfully registered"});
                }
            });
        });
    }
    catch(err){
        return res.status(400).json({message: err.message});
    }
};

const login=async(req, res)=>{
    try{
        const {email, password}= req.body;
        let user = await User.findOne({email:email});
        if(!user){
            return res.status(400).json({message: "Email or password incorrect"});
        }
        bcrypt.compare(password, user.password, function(err, result){
                if(result){
                    let token = jwt.sign({email, id:user._id}, "myjwtsecret");
                    res.cookie("token", token,{
                        httpOnly: true,
                        secure: false, // Set to true if using HTTPS
                        sameSite: 'Lax',
                        domain: 'localhost', // Ensure the domain is correct
                        path: '/' 
                      });
                      console.log("Cookies after setting token:", req.cookies);
                    // if(!req.cookies.token){
                    //     console.log("cookie is not set");
                    // }
                    // else{
                    //     console.log("cookie is set");
                    // }
                    // console.log(req.cookies);
                    console.log(`the token is ${token}`);
                    return res.status(200).json({message: "LoggedIn Successfully"});
                }
                else{
                    return res.status(400).json({message: "Email or password incorrect"});
                }
        })
    }
    catch(err){
        res.status(500).json({message:"Internal server error"});
    }
};

const logout=(req, res)=>{
    res.clearCookie("token");
    return res.status(200).json({message: "Logged out successfully"});
}

module.exports={register, login, logout};