const mongoose = require("mongoose");
const cartSchema = require("./cart");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{ 
        type: Boolean,
        default: false 
    },
    cart:[cartSchema],
});

const User = mongoose.model("User", userSchema);
module.exports = User;

