import React from 'react'
import '../styling/navLinks.css'
import {Link} from 'react-router-dom'

function NavLinks() {
    return (
      <>
        <div className="navLinks">
          <div className="navLinks-outer">
              <div className='navLinks-inner'>
                   <Link to='/home'>Home</Link>
            <Link to='/product'>Products</Link>
            <Link to='/contact'>Contact</Link>
              </div>
           
          </div>
        </div>
      </>
    );
}

export default NavLinks
