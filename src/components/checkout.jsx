import React from 'react'
import { connect } from 'react-redux';
import { getCartItems, deleteCartItem } from '../actions/itemActions'
import '../styling/checkout.css'
import Subtotal from './subtotal'
import CheckoutItem from './checkoutItem'

function Checkout({ cartItems, fetchCartItems, removeCartItem }) {
    React.useEffect(() => {
        fetchCartItems()
    }, [])

    const handleQuantityChange = (itemId, itemQuantity) => {
        console.log({ itemId, itemQuantity }, 'handle changed')
    }

    const handleRemoveItem = (itemId) => {
        removeCartItem({ itemId })
        console.log(itemId, 'handle remove item')
    }

    return (
        <div className='checkout'>
            <div className='checkout-left'>
                <h2 className='checkout-title'>{!cartItems.length ? "Your shopping basket is empty" : `You have ${cartItems.length} items in your shopping basket`}</h2>
                {!cartItems.length ?
                    (<p>You have no item in your cart</p>) :
                    (<div>
                        {cartItems.map((item) =>
                            <CheckoutItem item={item} key={item.id}
                                handleRemoveItem={handleRemoveItem}
                                handleQuantityChange={handleQuantityChange}
                            />)}
                    </div>)
                }
            </div>
            <div className='checkout-right'>
                <Subtotal />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        cartItems: state.itemReducer.cartItems,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCartItems: () => dispatch(getCartItems()),
        removeCartItem: (itemId) => dispatch(deleteCartItem(itemId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
