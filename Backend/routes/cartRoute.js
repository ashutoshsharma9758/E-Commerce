const express= require("express");
const mongoose = require("mongoose");
const router = express.Router();
router.use(express.urlencoded({extended:true}));
router.use(express.json());
const isAuthenticated= require("../middlewares/isLoggedIn.js");
const {getCart, addItemToCart, getCartItemById, updateCartItem, deleteCartItem}=require("../controllers/cartController.js");
router.get("/", isAuthenticated, getCart);
router.post("/", isAuthenticated, addItemToCart)

router.get("/:id", isAuthenticated, getCartItemById)
router.put("/:id", isAuthenticated, updateCartItem);
router.delete("/:id", isAuthenticated,deleteCartItem);
module.exports = router;