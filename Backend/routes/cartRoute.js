const express= require("express");
const mongoose = require("mongoose");
const Customer = require("../models/customer.js");
const router = express.Router();
router.use(express.urlencoded({extended:true}));
router.use(express.json());
const owner= require("../middlewares/isLoggedIn.js");
router.get("/cart", owner, async (req, res) => {
    try {
        const user = res.locals.user;
        if (!user) {
            console.log("User not found in res.locals");
            return res.status(404).json({ failure: "User not found" });
        }
        const populatedUser= await Customer.findOne({email: user.email}).populate('cart.item');   
        res.status(200).json(populatedUser.cart);
    } catch (err) {
        console.error("Internal server error:", err);
        res.status(500).json({ failure: "Internal server error" });
    }
});
router.post("/cart/addToCart", async(req, res)=>{
    const {item, user} = req.body;
    const itemId=item._id;

    try{
        const customer= await Customer.findOne({email: user.email});
        const existingItemidx = customer.cart.findIndex(cartItem=> cartItem.item._id.toString() === item._id.toString());
        console.log(existingItemidx);
        if(existingItemidx>-1){
            req.flash("failure", "Item is already in cart");
            return res.status(400).json({failure: req.flash("failure")});
        }
        // const newItem = new Cart(item);
        // await newItem.save();
        const newItem={
            item:item,
            quantity:1
        }
        customer.cart.push(newItem);
        await customer.save();
        req.flash("success", "Item added to cart successfully");
        return res.status(200).json({success: req.flash("success")});
        // res.send(item);
    }
    catch(err){
        console.log("error adding item to cart:", err);
        res.status(500).json({failure:"Internal server error"});
    }
})

router.get("/cart/:id", owner, async(req, res)=>{
let {id} = req.params;
const user= res.locals.user;
try{
    const customer= await Customer.findOne({email:user.email});
    const item= customer.cart.id(id);
    console.log("fetch item is", item);
    res.send(item);
}
catch(err){
    console.log(err);
}
})
router.put("/cart/:id", owner, async(req, res)=>{
let {id} = req.params;
const updatedItem = req.body;
const user= res.locals.user;
try{
    console.log("updated item is ", updatedItem);
    const customer= await Customer.findOne({email: user.email});
    const item= customer.cart.id(id);
    item.quantity= updatedItem.quantity;
    await customer.save();
    console.log("item is", item);
    res.json(item);
}
catch(err){
    console.log(err);
}
});
router.delete("/cart/:id", owner, async(req, res)=>{
let {id} = req.params;
try{
    const user = res.locals.user;
    const customer= await Customer.findOne({email: user.email});
    customer.cart= customer.cart.filter(item=>item._id.toString()!=id);
    await customer.save();
    console.log("Item deleted");
    res.send(customer.cart);
}
catch(err){
    console.log(err);
}
})
module.exports = router;