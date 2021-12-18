const INITIAL_STATE = {
  basket: [],
  allProducts: [],
  cartItems: [],
  productsLoading: true,
  cartItemsLoading: true,
};

const itemReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };

    case "ALL_PRODUCTS_LOADING":
      return {
        ...state,
        productsLoading: true,
        allProducts: [],
      };
    case "ALL_PRODUCTS_SUCCESS":
      return {
        ...state,
        productsLoading: false,
        allProducts: [...action.products],
      };
    case "ALL_PRODUCTS_ERROR":
      return {
        ...state,
        productsLoading: false,
        allProducts: [],
      };

    case "CART_ITEMS_LOADING":
      return {
        ...state,
        cartItemsLoading: true,
        cartItems: [],
      };
    case "CART_ITEMS_SUCCESS":
      return {
        ...state,
        cartItemsLoading: false,
        cartItems: [...action.cartItems],
      };
    case "CART_ITEMS_ERROR":
      return {
        ...state,
        cartItemsLoading: false,
        cartItems: [],
      };

    default:
      return state;
  }
};

export default itemReducer;
