const mongoose= require("mongoose");
const mongoSchema= mongoose.Schema;
const cartSchema= new mongoSchema({
    item:{
        type:mongoSchema.Types.ObjectId,
        ref:"Product",
        required:true
    },
    quantity:{
        type:Number,
        required:true,
        default:1
    }
})
module.exports= cartSchema
