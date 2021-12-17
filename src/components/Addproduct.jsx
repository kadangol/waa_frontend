import React from "react";
import { connect } from "react-redux";
import { postProduct } from "../actions/sellerProduct";
import "../styling/login.css";

function AddProduct({ saveProduct }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [quantity, setQuantity] = React.useState("");

  const handleSignIn = () => {
    saveProduct({
      name,
      description,
      price,
      quantity,
    });
  };

  return (
    <div className="login">
      <h1 className="header-logo">Add Product</h1>
      <div className="login-container">
        <h5>Name</h5>
        <input type="name" onChange={(e) => setName(e.target.value)} />
        <h5>Description</h5>
        <textarea rows="5" onChange={(e) => setDescription(e.target.value)} />
        <h5>Price Per Unit</h5>
        <input type="number" onChange={(e) => setPrice(+e.target.value)} />
        <h5>Quantity</h5>
        <input type="number" onChange={(e) => setQuantity(+e.target.value)} />
        <button onClick={handleSignIn} className="login-signinButton">
          Add Product
        </button>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveProduct: (productData) => dispatch(postProduct(productData)),
  };
};

export default connect(null, mapDispatchToProps)(AddProduct);
