import React, { useState } from 'react'
import "./Navbar.css";
import logo from "../Assets/3legant.png";
import cart_icon from "../Assets/cart_icon.png";
import { Link} from 'react-router-dom';
const Navbar = () => {
    const [menu, setMenu]=useState("home");
  return (
    <div className='navbar'>
      <div className='nav-logo' style={{marginLeft:"50px"}}>
        <img src={logo} alt="" />
      </div>
      <ul className='nav-menu'>
      <li onClick={()=>{setMenu("home")}}><Link to="/" style={{textDecoration:"none", color:"black"}}>Home</Link>{menu==="home"?<hr/>:<></>}</li>
      <li onClick={()=>{setMenu("shop")}}><Link to="/shop" style={{textDecoration:"none", color:"black"}}>Shop</Link>{menu==="shop"?<hr/>:<></>}</li>
      <li onClick={()=>{setMenu("product")}}><Link to="/product" style={{textDecoration:"none", color:"black"}}>Product</Link>{menu==="product"?<hr/>:<></>}</li>
      <li onClick={()=>{setMenu("contact")}}><Link to="/contact" style={{textDecoration:"none", color:"black"}}>Contact Us</Link>{menu==="contact"?<hr/>:<></>}</li>
      </ul>
      <div className='nav-login-cart' style={{marginRight:"50px"}}>
        <button>Login</button>
        <img src={cart_icon} alt="" />
        <div className='nav-cart-count'>0</div>
      </div>
    </div>
  )
}

export default Navbar
