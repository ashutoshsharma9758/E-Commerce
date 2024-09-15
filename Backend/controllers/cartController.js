const User= require("../models/user.js");

const getCart=async (req, res) => {
    try {
        const user = res.locals.user;
        if (!user) {
            console.log("User not found in res.locals");
            return res.status(404).json({ message: "User not found" });
        }
        const populatedUser= await User.findOne({email: user.email}).populate('cart.item');   
        res.status(200).json(populatedUser.cart);
    } catch (err) {
        console.error("Internal server error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

const addItemToCart=async(req, res)=>{
    const {item, user} = req.body;
    const itemId=item._id;

    try{
        const user= await User.findOne({email: user.email});
        const existingItemidx = user.cart.findIndex(cartItem=> cartItem.item._id.toString() === item._id.toString());
        console.log(existingItemidx);
        if(existingItemidx>-1){
            req.flash("failure", "Item is already in cart");
            return res.status(400).json({failure: req.flash("failure")});
        }
        const newItem={
            item:item,
            quantity:1
        }
        user.cart.push(newItem);
        await user.save();
        return res.status(200).json({message: "Item added to cart successfully"});
        // res.send(item);
    }
    catch(err){
        console.log("error adding item to cart:", err);
        res.status(500).json({failure:"Internal server error"});
    }
};

const getCartItemById=async(req, res)=>{
    let {id} = req.params;
    const user= res.locals.user;
    try{
        const user= await User.findOne({email:user.email});
        const item= user.cart.id(id);
        console.log("fetch item is", item);
        res.send(item);
    }
    catch(err){
        console.log(err);
    }
};

const updateCartItem=async(req, res)=>{
    let {id} = req.params;
    const updatedItem = req.body;
    const user= res.locals.user;
    try{
        console.log("updated item is ", updatedItem);
        const user= await User.findOne({email: user.email});
        const item= user.cart.id(id);
        item.quantity= updatedItem.quantity;
        await user.save();
        console.log("item is", item);
        res.json(item);
    }
    catch(err){
        console.log(err);
    }
};

const deleteCartItem= async(req, res)=>{
    let {id} = req.params;
    try{
        const user = res.locals.user;
        const dbUser= await User.findOne({email: user.email});
        dbUser.cart= dbUser.cart.filter(item=>item._id.toString()!=id);
        await dbUser.save();
        console.log("Item deleted");
        res.send(customer.cart);
    }
    catch(err){
        console.log(err);
    }
};

module.exports={getCart, addItemToCart, getCartItemById, updateCartItem, deleteCartItem};