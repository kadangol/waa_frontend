import React from 'react';
import { connect } from 'react-redux';
import { getCartItems } from '../actions/itemActions'

const withCart = (WrappedComponent) => {
  class Cart extends React.Component {
    componentDidMount() {
      const { fetchCartItems, userDetails } = this.props
      if(userDetails) fetchCartItems()
    }
    
    render() {
      return <WrappedComponent />
    }
  }

  const mapStateToProps = (state) => {
    return {
      userDetails: state.userReducer.userDetails,
    };
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      fetchCartItems: () => dispatch(getCartItems()),
    };
  };

  return connect(mapStateToProps, mapDispatchToProps)(Cart);
}

export default withCart
