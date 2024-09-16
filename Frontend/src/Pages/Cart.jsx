import React from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineClose } from 'react-icons/ai';
import "../Styles/cart.css";
import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
axios.defaults.withCredentials = true;
const Cart = () => {

  const [items, setItems] = useState([]);
    const[price, setPrice] = useState(0);
    const [authenticate, setAuthenticate]= useState();
    const [change, setChange]= useState(true);
    const navigate= useNavigate();
    // useEffect(()=>{
    //    const checkAuth= async()=>{
    //     try{
    //         const response = await axios.get('http://localhost:8080/check-auth', { withCredentials: true });
    //         setAuthenticate(response.data.success);
    //     }
    //     catch(err){
    //         setAuthenticate(false);
    //     }
    //    };
    //     checkAuth(); 
    // }, []);
    useEffect(()=>{
        if(change){
            const fetchdata = async()=>{
                try{
                    const response = await axios.get("http://localhost:8080/cart", { withCredentials: true });
                    console.log("Fetched data", response.data);
                    setItems(response.data);
                }
                catch(err){
                    console.error("fetch error", err);
                    console.log("data is not fetched", err.message);
                }
            }
            fetchdata();
            setChange(false);
        }
     }, [change]);

    const handlePrice = ()=>{
        let ans=0;
        items.map((item)=>{
            ans+=item.item.price*item.quantity;
        })
        setPrice(ans);
    }
    const incAmount =(id)=>{
        const fetchItem = async()=>{
            try{
                const response = await axios.get(`http://localhost:8080/cart/${id}`, { withCredentials: true });
                console.log("response is", response.data);
                const jsondata = response.data;
                jsondata.quantity += 1;
                console.log("updated json data", jsondata);
                await axios.put(`http://localhost:8080/cart/${id}`, jsondata, { withCredentials: true })
                .then(res=>{
                    console.log(res);
                })
                .catch(err=>{
                    console.log(err);
                })
                setChange(true);
            }
            catch(err){
                console.log(err);
            }
        }
        fetchItem();    
    }
    const decAmount = (id)=>{
        const fetchItem = async()=>{
            try{
                const response = await axios.get(`http://localhost:8080/customer/cart/${id}`, { withCredentials: true });
                const jsondata = response.data;
                if(jsondata.quantity>0){
                    jsondata.quantity-=1;
                }
                await axios.put(`http://localhost:8080/cart/${id}`, jsondata)
                .then(res=>{
                    console.log(res);
                })
                .catch(err=>{
                    console.log(err);
                })
                setChange(true);
            }
            catch(err){
                console.log(err);
            }
        }
        fetchItem();   
    }
    const deleteCart = async(id)=>{
        try{
            await axios.delete(`http://localhost:8080/cart/${id}`);
            setChange(true);
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        handlePrice();
    } );

    // useEffect(() => {
    //     if (authenticate === false) {
    //         navigate('/login');
    //     }
    // }, [authenticate, navigate]);
  return (
    <>
    <div className='cart'>
        <h3>CART</h3>
        {
            items.length === 0 && 
            <>
            <div className='empty_cart'>
                <h2>Your Shopping cart is empty</h2>
                <Link to='/shop'><button>Shop Now</button></Link>
            </div>
            </>
        }
        <div className='container'>
          {
            items.map((item) => 
            {
              return(
                <>
                <div className='box' key={item._id}>
                  <div className='img_box'>
                    <img src={item.item.image} alt='item.item.Name'></img>
                  </div>
                  <div className='detail'>
                    <div className='info'>
                    <h3>{item.item.name}</h3>
                    <p>Price: ${item.item.price}</p>
                    <p>Total: ${item.item.price * item.quantity}</p>
                    </div>
                    <div className='quantity'>
                      <button onClick={()=>incAmount(item._id)}>+</button>
                      <input type='number' value={curElm.qty}></input>
                      <button onClick={()=>decAmount(item._id)}>-</button>
                    </div>
                    <div className='icon'>
                      <li onClick={()=>deleteCart(item._id)}><AiOutlineClose /></li>
                    </div>
                  </div>
                </div>
                </>
              )
            })
          }
        </div>
        <div className='bottom'>
          {
            items.length > 0 && 
            <>
            <div className='Total'>
              <h4>Sub Total: ${price}</h4>
            </div>
            <button>checkout</button>
            </>
          }
        </div>
    </div>
    </>
  )
}

export default Cart
