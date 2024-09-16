import React from 'react'
import Item from '../Components/Item/Item.jsx';
import "../Styles/product.css";
import { useState, useEffect } from 'react';
// import {Link} from 'react-router-dom';
import Footer from '../Components/Footer/Footer.jsx';
const Product = () => {
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
  return (<>
    <div className='popular'>
      <h1>PRODUCT</h1>
      <hr />
      <div className="popular-item">
        {items.map((item, i)=>{
          // <Link to={`/customerShowCard/${item._id}`} style={{"textDecoration":"none"}}></Link>
            return <Item key={i} id={item._id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
        })}
      </div>
    </div>
    </>
  )
}

export default Product
