const mongoose=require("mongoose");
const mongoSchema= mongoose.Schema;

const ProductSchema= new mongoSchema({
    name:{
        type:String,
        required:true
    },
    category:{
       type:String,
       required:true
        
    },
    image:{
         type:String,
         required:true,
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
})
const Product= mongoose.model("Product", ProductSchema);
module.exports=Product;