import React from 'react'
import '../styling/navLinks.css'
import { Link } from 'react-router-dom'
import withAuth from '../hoc/auth';

function NavLinks({ role }) {
  console.log(role, 'i am role')
  return (
    <>
      <div className="navLinks">
        <div className="navLinks-outer">
          <div className='navLinks-inner'>
            <Link to='/home'>Home</Link>
            {role === 'admin' && <Link to='/approve-sellers'>Sellers</Link>}
            <Link to='/product'>Products</Link>
            <Link to='/contact'>Contact</Link>
          </div>

        </div>
      </div>
    </>
  );
}

export default withAuth(NavLinks)
