const Product= require('../models/product.js'); 
const User= require('../models/user.js');
const isAdminOrOwner= async(req, res, next)=>{
    try{
      const productId= req.params.id;
      const product= await Product.findById(productId);
  
      if(!product){
        return res.status(404).json({ message: 'Product not found' });
      }
      const user= await User.findById(req.user.id);
      if(String(product.owner)=== String(user._id)) {
        next();
      }
      else{
        return res.status(403).json({message: 'Access denied. Not an owner or admin'});
      }
    } 
    catch(err){
      return res.status(500).json({message: 'Server error'});
    }
  };
  module.exports=isAdminOrOwner;