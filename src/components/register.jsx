import React from "react";
import { connect } from 'react-redux';
import { register } from '../actions/users';
import "../styling/register.css";

function Register({ postRegister }) {
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [userName, setUserName] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [status, setStatus] = React.useState('seller')
  const [password, setPassword] = React.useState('')
  const [shippingAddress, setShippingAddress] = React.useState({
    city: '',
    state: '',
    street: '',
    zipcode: 0,
  })

  const handleShippingAdrressChange = (val, name) => {
    console.log(val, 'val')
    setShippingAddress({
      ...shippingAddress,
      [name]: val
    })
  }

  const handleRegister = () => {
    postRegister({
      fullName: name,
      userName,
      phoneNo: phone,
      emailAddress: email,
      password,
      status,
      shippingAddress
    })
  }

  return (
    <div className="login">
      <h1 className="header-logo">Mini Amazon</h1>
      <div className="login-container">
        <h1>Sign Up</h1>
        <h5>Full Name</h5>
        <input type="text" onChange={(e) => setName(e.target.value)} />
        <h5>User name</h5>
        <input type="text" onChange={(e) => setUserName(e.target.value)} />
        <h5>Phone number</h5>
        <input type="text" onChange={(e) => setPhone(e.target.value)} />
        <label htmlFor="">Email:</label>
        <input type="email" onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="">Password</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
        <label htmlFor="status">Status:</label>
        <select onChange={(e) => setStatus(e.target.value)} defaultValue={status}>
          <option value="seller">Seller</option>
          <option value="buyer">Buyer</option>
        </select> <br />
        {status === 'buyer' &&
          <div>
            <h5>Shipping Address</h5>
            <h5>City</h5>
            <input type="text" onChange={(e) => handleShippingAdrressChange(e.target.value, 'city')} />
            <h5>State</h5>
            <input type="text" onChange={(e) => handleShippingAdrressChange(e.target.value, 'state')} />
            <h5>Street</h5>
            <input type="text" onChange={(e) => handleShippingAdrressChange(e.target.value, 'street')} />
            <h5>Zipcode</h5>
            <input type="text" onChange={(e) => handleShippingAdrressChange(+e.target.value, 'zipcode')} />
          </div>
        }
        <button type="submit" className="login-signinButton" onClick={handleRegister}>
          Register
        </button>
        <p>
          By signing-in, you are argreeing to MiniAmazon Terms and Condition
        </p>
        <button className="login-registerButton">
          create MiniAmazon account
        </button>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTest: () => dispatch(test()),
    postRegister: (registerData) => dispatch(register(registerData)),
  };
};

export default connect(null, mapDispatchToProps)(Register);
