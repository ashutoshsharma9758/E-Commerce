const express= require("express");
const router= express.Router();
const {getProduct, addProduct}=require("../controllers/productController.js");
router.get("/products", getProduct);
router.post("/products", addProduct);
const Addvegetable = require("../models/Additems.js");
router.use(express.urlencoded({extended:true}));
router.use(express.json());
const owner= require("../middlewares/isLoggedIn.js");
router.get("/allitems", async(req, res)=>{
    const allItems = await Addvegetable.find({});
    res.send(allItems);
})
router.get("/item/:id", async(req, res)=>{
    let {id} = req.params;
    const data = await Addvegetable.findById(id);
    res.send(data);
})
const hawkerSchema = require('../models/NewHawker');
const User = require('../models/User');
router.post('/', async (req, res) => {
    try {
      const { titleName, ownerName, mbNumber, address, image, owner } = req.body;
  
      // Check if the owner exists
      const existingOwner = await User.findById(owner);
      if (!existingOwner) {
        return res.status(404).json({ error: 'Owner not found' });
      }
  
      // Create the hawker
      const newHawker = await hawkerSchema.create({
        title: titleName,
        ownerName,
        mbNb: mbNumber,
        address,
        image,
        owner
      });
  
      // Populate the owner field
      const populatedHawker = await hawkerSchema.findById(newHawker._id).populate('owner');
  
      res.json(populatedHawker);
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: err.message });
    }
  });
module.exports=router;