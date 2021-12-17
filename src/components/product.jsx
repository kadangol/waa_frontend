import React from 'react';
import { connect } from 'react-redux';
import { addToBasket } from '../actions/itemActions';
import '../styling/product.css';

function Product({
    id,
    title,
    image,
    price,
    rating,
    description,
    nameOfSeller,
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
        // pushItemToCart({ id })
    };
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
            <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToBasket: (item) => dispatch(addToBasket(item)),
    };
};

export default connect(null, mapDispatchToProps)(Product);
