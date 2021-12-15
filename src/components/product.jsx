import React from 'react'
import { useStateValue } from '../context/stateProvider'
import '../styling/product.css'

function Product({id, title, image, price, rating, description, nameOfSeller}) {
  const [{basket}, dispatch] = useStateValue()
  const addToBasket = () => {
    dispatch({
      type: 'ADD_TO_BASKET',
    item:{
      id: id,
      title: title,
      image: image,
      price: price,
      rating: rating
    }
   
     } )
  }
    return (
      <div className="product">
        <div className="product-info">
          <p>{title}</p>
          <p className="product-price">
            <small>$</small>
            <strong> {price}</strong>
          </p>
          <div className="product-rating">
            {Array(rating)
              .fill()
              .map((_) => {
                <p>*</p>;
              })}
          </div>
        </div>
        <img src={image} alt="" />
        <p>{description}</p>
        <button onClick={addToBasket}>Add to Cart</button>
      </div>
    );
}

export default Product
