import React, { useState, useEffect } from 'react'
import "../Styles/shop.css";
import { AiFillHeart, AiFillEye, AiOutlineClose} from 'react-icons/ai';
import data_product from "../Components/Assets/new_collections.js";
import Item from '../Components/Item/Item.jsx';
import "../Components/Popular/Popular.css"
import {Link} from 'react-router-dom';
import Footer from '../Components/Footer/Footer.jsx';
{/* <li><AiFillHeart /></li> 
<li ><AiFillEye /></li>  */}
const Shop = () => {
    const [items, setItems] = useState([]);
         useEffect( () => {
          const fetchItems = async()=>{
            try{
              const items = await fetch("http://localhost:8080/products");
              const allItems = await items.json();
              setItems(allItems);
            }
            catch(err){
              console.log(err);
            }
          }
          fetchItems();
        }, [])
  return (
    <>
    {
        items ? 
        <>
        <div className='product_detail'>
            <button className='close_btn' onClick={closedetail}><AiOutlineClose /></button>
            <div className='container'>
                <div className='img_box'>
                    <img src={detail.image} alt=''></img>
                </div>
                <div className='info'>
                    <h4># {detail.cat}</h4>
                    <h2>{detail.Name}</h2>
                    <p>A Searchcreen Everyone Will Love: Whether your family is streaming or video chatting with friends tablet A8...</p>
                    <h3>${detail.price}</h3>
                    <button onClick={() => addtocart (detail)}>Add To Cart</button>
                </div>
            </div>
        </div>
        </>
        : null
    }
    <div className='shop'>
        <h2># shop</h2>
        <p>Home . shop</p>
        <div className='container'>
            <div className='left_box'>
                <div className='category'>
                    <div className='header'>
                        <h3>all categories</h3>
                    </div>
                    <div className='box'>
                        <ul>
                            <li onClick={() => allcatefilter ()}># All</li>
                            <li onClick={() => Filter ("tv")}># tv</li>
                            <li onClick={() => Filter ("laptop")}># laptop</li>
                            <li onClick={() => Filter ("watch")}># watch</li>
                            <li onClick={() => Filter ("speaker")}># speaker</li>
                            <li onClick={() => Filter ("electronics")}># electronics</li>
                            <li onClick={() => Filter ("headphone")}># headphone</li>
                            <li onClick={() => Filter ("phone")}># phone</li>
                        </ul>
                    </div>
                </div>
                <div className='banner'>
                    <div className='img_box'>
                        <img src='image/shop_left.avif' alt=''></img>
                    </div>
                </div>
            </div>
            <div className='right_box'>
                <div className='banner'>
                    <div className='img_box'>
                        <img src='image/shop_top.webp' alt=''></img>
                    </div>
                </div>
                <div className='product_box'>
                    <h2 style={{alignItems:"center"}}>Shop Product</h2>
                    <div className='popular' style={{marginLeft:"200px"}}>
                    <div className="popular-item" style={{marginLeft:"200px"}}>
                        {items.map((item, i)=>{
                            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
                        })}
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Shop