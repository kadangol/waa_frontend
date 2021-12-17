import React, { useState, useEffect, useRef } from "react";
import "../styling/register.css"
import { useStateValue } from "../context/stateProvider";
import axios from 'axios'

const API_URL = "http://localhost:8082/api/auth/signup";


function Signup() {
     const usernameRef = useRef(null);
     const fullnameRef = useRef(null);
     const emailRef = useRef(null);
     const passwordRef = useRef(null);
     const phoneeRef = useRef(null);
     const roleRef = useRef(null);
const register = 
  useEffect(() => {
    axios
      .post(API_URL, {
        type: "ADD_TO_BASKET",
        user: {
          username: "Juliet",
          email: "ify@gmail.com",
          fullname: "ifeyinwa j",
          password: "ugochukwu",
          phone: "2349083453",
          role: "buyer",
        },
      })
      .then((response) => console.log(response))
      .catch((e) => {
        console.log(e);
      });
  }, []);

    return(
    <>
      <div className="login">
        <h1 className="header-logo">Mini Amazon</h1>
        <div className="login-container">
          <h1>Sign Up</h1>
          <form action="">
            <h5>Name</h5>
            <input type="text" ref={fullnameRef} />
            {/* <label htmlFor="status">Status:</label>
            <select name="status" ref={roleRef}>
              <option>Seller</option>
              <option>Buyer</option>
            </select> */}
            <br />
            <label htmlFor="">Email:</label>
            <input type="email" ref={emailRef} />
            <label htmlFor="">Password</label>
            <input type="password" ref={passwordRef} />
            <label htmlFor="">Phone</label>
            <input type="text" ref={phoneeRef} />
            <label htmlFor="">Username</label>
            <input type="text" ref={usernameRef} />
            <button type="submit" className="login-signinButton">
              Register
            </button>
          </form>
          <p>
            By signing-in, you are argreeing to MiniAmazon Terms and Condition
          </p>
          <button className="login-registerButton" onClick={register}>
            create MiniAmazon account
          </button>
        </div>
      </div>
    </>
    )
}
export default Signup