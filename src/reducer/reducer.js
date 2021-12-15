
export const initialState = {
    basket: [],
    loggedInUser: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
      case "SET_LOGIN":
        return{
          ...state,
          loggedInUser: action.user
        }

   
  }
};
export default reducer;