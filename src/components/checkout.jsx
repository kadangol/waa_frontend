import React from 'react'
import '../styling/checkout.css'
import Subtotal from './subtotal'

function Checkout() {
    return (
        <div className='checkout'>
            <div className='checkout-left'>
            <h2 className='checkout-title'>Your shopping basket is empty</h2>
            <p>You have no item in your cart</p>
            </div>
            <div className='checkout-right'>
        <Subtotal />
            </div>

        </div>
    )
}

export default Checkout
