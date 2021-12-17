import React from 'react';
import { FaSearch, FaShoppingCart } from 'react-icons/fa';
import '../styling/header.css';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import withAuth from '../hoc/auth'
import withCart from '../hoc/cart'
import { logout } from '../actions/users';
import { useStateValue } from '../context/stateProvider';

function Header({ cartItems, userDetail, postLogout }) {
    const navigate = useNavigate();
    const [showDropDown, setShowDropDown] = React.useState(false)

    const handleAccountsClick = () => {
        if (!userDetail) {
            navigate('/login')
        } else {
            setShowDropDown(prev => !prev)
        }
    }

    const handleLogout = () => {
        postLogout()
    }

    return (
        <nav className='header'>
            <h1 className='header-logo'>Mini Amazon</h1>
            <div className='header-search'>
                <input
                    type='text'
                    name=''
                    id=''
                    className='header-searchinput'
                />
                <FaSearch className='header-searchicon' />
            </div>
            {/* <Link to='/Login' className='header-link'>
                <div className='header-option'>
                    <span className='header-optionLineOne' onClick={() => setShowDropDown(prev => !prev)}>Hello, {userDetail ? userDetail.username : 'user'}</span>
                    {userDetail && showDropDown &&
                        <ul>
                            <li>{userDetail.username}</li>
                            <li>Logout</li>
                        </ul>}
                    {!userDetail ?
                        <span className='header-optionLineTwo'>
                            Sign in/Register{' '}
                        </span> :
                        <span className='header-optionLineTwo'>
                            Accounts & Lists
                        </span>
                    }
                </div>
            </Link> */}
            <div className='header-option' onClick={handleAccountsClick}>
                <span className='header-optionLineOne'>Hello, {userDetail ? userDetail.username : 'user'}</span>
                {userDetail && showDropDown &&
                    <ul className='usermenu-dropdown'>
                        <li>{userDetail.username}</li>
                        <li onClick={handleLogout}>Logout</li>
                    </ul>}
                {!userDetail ?
                    <span className='header-optionLineTwo'>
                        Sign in/Register{' '}
                    </span> :
                    <span className='header-optionLineTwo'>
                        Accounts & Lists
                    </span>
                }
            </div>
            <Link to='/Login' className='header-link'>
                <div className='header-option'>
                    <span className='header-optionLineOne'>Returns</span>
                    <span className='header-optionLineTwo'>& Orders</span>
                </div>
            </Link>
            <Link to='/checkout' className='header-link'>
                <div className='header-optionBasket'>
                    <FaShoppingCart />
                    <span className='header-optionLineTwo header-productCount'>
                        {cartItems?.length}
                    </span>
                </div>
            </Link>
        </nav>
    );
}

const mapStateToProps = (state) => {
    return {
        cartItems: state.itemReducer.cartItems,
        userDetail: state.userReducer.userDetail,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        postLogout: () => logout()
    };
};


export default withAuth(withCart(connect(mapStateToProps, mapDispatchToProps)(Header)));
