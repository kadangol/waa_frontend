import React from 'react'
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import '../styling/header.css'
import { Link } from 'react-router-dom';
import { useStateValue } from '../context/stateProvider';

function Header() {
  const [{basket}, dispatch] = useStateValue();
    return (
      <nav className="header">
        <h1 className="header-logo">Mini Amazon</h1>
        <div className="header-search">
          <input type="text" name="" id="" className="header-searchinput" />
          <FaSearch className="header-searchicon" />
        </div>
        <Link to="/Login" className="header-link">
          <div className="header-option">
            <span className="header-optionLineOne">Hello, user</span>
            <span className="header-optionLineTwo">Sign in/Register </span>
          </div>
        </Link>
        <Link to="/Login" className="header-link">
          <div className="header-option">
            <span className="header-optionLineOne">Returns</span>
            <span className="header-optionLineTwo">& Orders</span>
          </div>
        </Link>
        <Link to="/checkout" className="header-link">
          <div className="header-optionBasket">
            <FaShoppingCart />
            <span className="header-optionLineTwo header-productCount" >{basket?.length}</span>
          </div>
        </Link>
      </nav>
    );
}

export default Header;
