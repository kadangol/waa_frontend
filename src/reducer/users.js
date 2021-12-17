const INITIAL_STATE = {
  userDetail: false,
  unapprovedSellers: [],
  unapprovedSellersLoading: true
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOGIN_LOADING':
      return {
        ...state,
        userDetail: false,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        userDetail: action.data,
      };
    case 'LOGIN_ERROR':
      return {
        ...state,
        userDetail: false,
      };

    case 'FETCH_UNAPPROVED_SELLERS_LIST_LOADING':
      return {
        ...state,
        unapprovedSellersLoading: true,
        unapprovedSellers: [],
      };
    case 'FETCH_UNAPPROVED_SELLERS_LIST_SUCCESS':
      return {
        ...state,
        unapprovedSellersLoading: false,
        unapprovedSellers: [...action.sellerList],
      };
    case 'FETCH_UNAPPROVED_SELLERS_LIST_ERROR':
      return {
        ...state,
        unapprovedSellersLoading: false,
        unapprovedSellers: [],
      };

    default:
      return state;
  }
};

export default userReducer;
