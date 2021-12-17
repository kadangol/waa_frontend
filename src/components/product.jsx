import {React, useState} from 'react';
import { connect } from 'react-redux';
import { addToBasket, addItemToCart } from '../actions/itemActions';
import '../styling/product.css';
import withAuth from '../hoc/auth';

function Product({
    id,
    title,
    image,
    price,
    rating,
    description,
    role,
    nameOfSeller,
    shippingAddress,
    pushItemToCart,
    addToBasket,
}) {
    const handleAddToCart = () => {
        addToBasket({
            id: id,
            title: title,
            image: image,
            price: price,
            rating: rating,
        });
        pushItemToCart({
            productId: id,
            quantity: 1,
            shippingAddress
        })
    };
    const [isBuyer, setIsBuyer] = useState(true)//(role === 'buyer') //TODO it should read from UserDetails
    const [showReview, setShowReview] = useState(false);
    const toggleReviewVisibility = () => {
        //TODO set review data if(role === 'BUYER')
        setShowReview(!showReview);
    }
    return (
        <div className='product'>
            <div className='product-info'>
                <p>{title}</p>
                <p className='product-price'>
                    <small>$</small>
                    <strong> {price}</strong>
                </p>
                <div className='product-rating'>
                    {Array(rating)
                        .fill()
                        .map((_) => {
                            <p>*</p>;
                        })}
                </div>
            </div>
            <img src={image} alt='' />
            <p>{description}</p>
            { showReview ? <div><h5>Product reviews: {role}</h5><review /></div> : null}
            
            <button onClick={toggleReviewVisibility}>Show reviews</button>
            { isBuyer ? <button onClick={handleAddToCart}>Add to Cart</button> : null}
            
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
      shippingAddress: state.userReducer?.shippingAddress,
    };
  };

  
const mapDispatchToProps = (dispatch) => {
    return {
        addToBasket: (item) => dispatch(addToBasket(item)),
        pushItemToCart: (item) => dispatch(addItemToCart(item)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
