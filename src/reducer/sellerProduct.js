const INITIAL_STATE = {
  sellerProducts: [],
  sellerProductsLoading: true,
};

const sellerProductReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_SELLER_PRODUCT_LOADING":
      return {
        ...state,
        sellerProductsLoading: true,
        sellerProducts: [],
      };
    case "GET_SELLER_PRODUCT_SUCCESS":
      return {
        ...state,
        sellerProductsLoading: false,
        sellerProducts: [...action.data],
      };
    case "GET_SELLER_PRODUCT_ERROR":
      return {
        ...state,
        sellerProductsLoading: false,
        sellerProducts: [],
      };

    default:
      return state;
  }
};

export default sellerProductReducer;
