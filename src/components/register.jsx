import React from "react";
import "../styling/register.css";

function Register() {
  return (
    <div className="login">
      <h1 className="header-logo">Mini Amazon</h1>
      <div className="login-container">
        <h1>Sign Up</h1>
        <form action="">
          <h5>Name</h5>
          <input type="text" />
          <label htmlFor="status">Status:</label>
          <select name="status" id="">
            <option value="status">Seller</option>
            <option value="">Buyer</option>
          </select> <br />
          <label htmlFor="">Email:</label>
          <input type="email" />
          <label htmlFor="">Password</label>
          <input type="password" />
          <button type="submit" className="login-signinButton">
            {" "}
           Register
          </button>
        </form>
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

export default Register;
