const express=require("express");
const app=express();
const connectDB= require("./config/db.js");
const dotenv=require("dotenv");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require('cookie-parser');
dotenv.config();
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
    credentials: true // Allow credentials (cookies)
  }));
app.use(session({secret:"mysecret", resave: false, saveUninitialized:true}));

const port= process.env.PORT;
const authRoute= require("./routes/authRoute.js");
const productRoute=require("./routes/productRoute.js");
const cartRoute=require("./routes/cartRoute.js");
app.use("/", authRoute);
app.use("/products", productRoute);
app.use("cart", cartRoute);
app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
})