const Product= require("../models/product.js");

const getAllProducts= async(req, res)=>{
    try{
        const allItems= await Product.find({});
        res.send(allItems);
    }
    catch(err){
        return res.status(500).json({message:'Server error'});
    }
}

const getProductById=async(req, res)=>{
    let {id} = req.params;
    try{
        const product= await Product.findById(id);
        if (!product){
        return res.status(404).json({message:'Product not found'});
        }
        res.send(product);
    }
    catch(err){
        return res.status(500).json({message:'Server error'});
    }
}

const addProduct=async (req, res) => {
    try{
        const{name, category, image, description, price}=req.body;
        const user= res.locals.user;
        if(!user.isAdmin){
        return res.status(403).json({message:'Access denied. Admin only'});
        }
        const newProduct= new Product({
        name,
        category,
        image,
        description,
        price,
        title,
        owner:user.id,
        });
        const savedProduct= await newProduct.save();
        return res.status(201).json(savedProduct);
    } 
    catch(err){
        console.error(err);
        return res.status(500).json({message:'Server error'});
    }
}

const updateProduct=async(req, res)=>{
    const {name, category, image, description, price}= req.body;
    try{
      const updatedProduct= await Product.findByIdAndUpdate(
        req.params.id,
        {name, category, image, description, price},
        {new:true}
      );
      if(!updatedProduct){
        return res.status(404).json({ message:'Product not found'});
      }
  
      return res.status(200).json(updatedProduct);
    }catch(err){
      return res.status(500).json({message:'Server error'});
    }
}

const deleteProduct=async(req, res)=>{
    try{
      const deletedProduct= await Product.findByIdAndDelete(req.params.id);
      if (!deletedProduct) {
        return res.status(404).json({message:'Product not found'});
      }
      return res.status(200).json({message:'Product deleted successfully'});
    }catch(err){
      return res.status(500).json({message:'Server error'});
    }
}

module.exports={ getAllProducts, getProductById, addProduct, updateProduct, deleteProduct};
