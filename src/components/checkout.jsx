import React from "react";
import { connect } from "react-redux";
import {
  getCartItems,
  deleteCartItem,
  postPlaceOrderItem,
} from "../actions/itemActions";
import "../styling/checkout.css";
import Subtotal from "./subtotal";
import CheckoutItem from "./checkoutItem";

function Checkout({
  cartItems,
  fetchCartItems,
  savePlaceOrderItem,
  removeCartItem,
}) {
  React.useEffect(() => {
    fetchCartItems();
  }, []);

  const handleQuantityChange = (itemId, itemQuantity) => {
    console.log({ itemId, itemQuantity }, "handle changed");
  };

  const handleRemoveItem = (itemId) => {
    removeCartItem({ itemId });
  };

  const handlePlaceOrderItem = (itemId) => {
    savePlaceOrderItem({ itemId });
  };

  return (
    <div className="checkout">
      <div className="checkout-left">
        <h2 className="checkout-title">
          {!cartItems.length
            ? "Your shopping basket is empty"
            : `You have ${cartItems.length} items in your shopping basket`}
        </h2>
        {!cartItems.length ? (
          <p>You have no item in your cart</p>
        ) : (
          <div>
            {cartItems.map((item) => (
              <CheckoutItem
                item={item}
                key={item.id}
                handleRemoveItem={handleRemoveItem}
                handleQuantityChange={handleQuantityChange}
                handlePlaceOrderItem={handlePlaceOrderItem}
              />
            ))}
          </div>
        )}
      </div>
      <div className="checkout-right">
        <Subtotal />
      </div>
    </div>
  );
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
    savePlaceOrderItem: (itemId) => dispatch(postPlaceOrderItem(itemId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
