import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess, fetchBuyerDetailSuccess } from '../actions/users'

const withAuth = (WrappedComponent) => {
  function Auth({ userDetails, setUserData, setShippingAddressData, history }) {
    const [role, setRole] = React.useState('')
    const navigate = useNavigate();

    React.useEffect(() => {
      const persistedUserDetail = localStorage.getItem('userDetails')
      const persistedShippingAddress = localStorage.getItem('shippingAddress')

      if (persistedUserDetail && !userDetails) {
        const parsedData = JSON.parse(persistedUserDetail)
        setUserData(parsedData)

        if (parsedData?.message === 'NOTAPPROVEDYET') navigate('/unapproved')
        if (!parsedData?.roles?.length) return

        switch (parsedData.roles[0]) {
          case "ROLE_ADMIN":
            setRole('admin')
            break;
          case "ROLE_SELLER":
            setRole('seller')
            break;
          case "ROLE_BUYER":
            setRole('buyer')
            break;
          default:
            break;
        }
      }

      if (persistedShippingAddress) {
        const parsedData = JSON.parse(persistedShippingAddress)
        setShippingAddressData(parsedData)
      }

    }, [history, setUserData, setShippingAddressData, userDetails, navigate])

    return <WrappedComponent role={role} />
  }

  const mapStateToProps = (state) => {
    return {
      userDetails: state.userReducer.userDetails,
    };
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      setUserData: (userData) => dispatch(loginSuccess(userData)),
      setShippingAddressData: (shippingData) => dispatch(fetchBuyerDetailSuccess(shippingData)),
    };
  };

  return connect(mapStateToProps, mapDispatchToProps)(Auth);
}

export default withAuth
