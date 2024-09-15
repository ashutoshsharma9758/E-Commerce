import React from 'react'
import "../Components/Popular/Popular.css";
import data_product from "../Components/Assets/new_collections.js";
import Item from '../Components/Item/Item.jsx';
const Product = () => {
  return (
    <div className='popular'>
      <h1>POPULAR</h1>
      <hr />
      <div className="popular-item">
        {data_product.map((item, i)=>{
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
        })}
      </div>
    </div>
  )
}

export default Product
