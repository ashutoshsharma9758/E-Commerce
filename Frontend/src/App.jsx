// import './App.css's
import Navbar from "./Components/Navbar/Navbar.jsx";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "./Pages/Home.jsx";
import Shop from "./Pages/shop.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import Product from "./Pages/Product.jsx";
import Cart from "./Pages/Cart.jsx";
import Contact from "./Pages/Contact.jsx";
import Login from "./Pages/Login.jsx";
import SignUp from "./Pages/SignUp.jsx";
function App() {

  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/shop' element={<Shop/>}/>
      <Route path='/product' element={<Product/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/contact' element={<Contact/>}/>
    </Routes>
    {/* <Footer/> */}
    </BrowserRouter>
    </>
  )
}

export default App
