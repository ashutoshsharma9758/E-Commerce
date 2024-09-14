const mongoose= require("mongoose");
const mongoSchema= mongoose.Schema;
const cartSchema= new mongoSchema({
    item:{
        type:Schema.Types.ObjectId,
        ref:"Addvegetable",
        required:true
    },
    quantity:{
        type:Number,
        required:true,
        default:1
    }
})
module.exports= cartSchema
