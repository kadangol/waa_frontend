import React from 'react'
import '../styling/login.css'
import Signup from './signup';
import {useNavigate} from 'react-router-dom'

function Login() {
 
  const navigate = useNavigate();
  const handleClick = () => navigate("/signup")
    return (
      <div className="login">
        <h1 className="header-logo">Mini Amazon</h1>
        <div className="login-container">
          <h1>Sign In</h1>
          <form action="">
            <h5>E-mail</h5>
            <input type="email" />
            <h5>Password</h5>
            <input type="password" />
            <button onClick={handleClick} type="submit" className="login-signinButton">
              {" "}
              Sign In
            </button>
          </form>
          <p>
            By signing-in, you are argreeing to MiniAmazon Terms and Condition
          </p>
          <button className="login-registerButton">
            create MiniAmazon account
          </button>
          <button className="login-registerButton" onClick={handleClick}>
            Register
          </button>
        </div>
      </div>
    );
}

export default Login
