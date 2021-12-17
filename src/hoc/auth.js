import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../actions/users'

const withAuth = (WrappedComponent) => {
  function Auth({ userDetails, setUserData, history }) {
    const [role, setRole] = React.useState('')
    const navigate = useNavigate();

    React.useEffect(() => {
      // const { userDetails, setUserData, history } = this.props
      const persistedUserDetail = localStorage.getItem('userDetails')

      if (persistedUserDetail && !userDetails) {
        const parsedData = JSON.parse(persistedUserDetail)
        setUserData(parsedData)

        console.log(parsedData, 'i am parsed data')
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
    }, [history, setUserData, userDetails])

    return <WrappedComponent role={role} />
  }
  // class Auth extends React.Component {
  //   state = {
  //     role: ''
  //   }

  //   componentDidMount() {
  //     const { userDetails, setUserData, history} = this.props

  //     const persistedUserDetail = localStorage.getItem('userDetails')

  //     if (persistedUserDetail && !userDetails) {
  //       const parsedData = JSON.parse(persistedUserDetail)
  //       setUserData(parsedData)

  //       console.log(parsedData, 'i am parsed data')
  //       if(parsedData?.message === 'NOTAPPROVEDYET') console.log(history, 'history')
  //       if (!parsedData?.roles?.length) return

  //       switch (parsedData.roles[0]) {
  //         case "ROLE_ADMIN":
  //           this.setState({ role: 'admin' })
  //           break;
  //         case "ROLE_SELLER":
  //           this.setState({ role: 'seller' })
  //           break;
  //         case "ROLE_BUYER":
  //           this.setState({ role: 'buyer' })
  //           break;
  //         default:
  //           break;
  //       }
  //     }
  //   }

  //   render() {

  //   }
  // }

  const mapStateToProps = (state) => {
    return {
      userDetails: state.userReducer.userDetails,
    };
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      setUserData: (userData) => dispatch(loginSuccess(userData)),
    };
  };

  return connect(mapStateToProps, mapDispatchToProps)(Auth);
}

export default withAuth
