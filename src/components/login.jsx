import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import '../styling/login.css';
import { login } from '../actions/users';

function Login({ userDetails, postLogin }) {
    const [user, setUser] = React.useState('')
    const [password, setPassword] = React.useState('')
    const navigate = useNavigate();
    const handleClick = () => navigate('/register');

    React.useEffect(() => {
        if (userDetails) navigate('/home')
    }, [userDetails, navigate]);

    const handleSignIn = () => {
        postLogin({
            user,
            password
        })
    }

    return (
        <div className='login'>
            <h1 className='header-logo'>Mini Amazon</h1>
            <div className='login-container'>
                <h1>Sign In</h1>
                {/* <form action=''>
                    
                </form> */}
                <h5>UserName</h5>
                <input type='user' onChange={(e) => setUser(e.target.value)} />
                <h5>Password</h5>
                <input type='password' onChange={(e) => setPassword(e.target.value)} />
                <button
                    onClick={handleSignIn}
                    className='login-signinButton'
                >
                    Sign In
                </button>
                <p>
                    By signing-in, you are argreeing to MiniAmazon Terms and
                    Condition
                </p>
                <button className='login-registerButton'>
                    create MiniAmazon account
                </button>
                <button className='login-registerButton' onClick={handleClick}>
                    Register
                </button>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        userDetails: state.userReducer.userDetail,
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        postLogin: (loginData) => dispatch(login(loginData)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
