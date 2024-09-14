const mongoose = require("mongoose");
const cartSchema = require("./cart");
const Schema = mongoose.Schema;

const customerSchema = new Schema({
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
    cart:[cartSchema],
});

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;

