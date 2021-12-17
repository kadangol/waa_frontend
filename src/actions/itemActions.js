import axios from 'axios';

// fetch token from localstorage
let userDetails = localStorage.getItem('userDetails')
let token = ''
if (userDetails) {
    userDetails = JSON.parse(userDetails)
    token = `Bearer ${userDetails.accessToken}`
}

// old code
export function addToBasket(item) {
    return {
        type: 'ADD_TO_BASKET',
        item,
    };
}

// fetch product for home
export function allProductsHaveError(bool) {
    return {
        type: 'ALL_PRODUCTS_ERROR',
        hasError: bool,
    };
}

export function allProductsAreLoading(bool) {
    return {
        type: 'ALL_PRODUCTS_LOADING',
        isLoading: bool,
    };
}

export function allProductsFetchDataSuccess(products) {
    return {
        type: 'ALL_PRODUCTS_SUCCESS',
        products,
    };
}

export function getProducts() {
    return (dispatch) => {
        dispatch(allProductsAreLoading(true));

        axios
            .get('http://localhost:8082/product')
            .then((response) => {
                if (response.status !== 200) {
                    throw Error(response.statusText);
                }

                dispatch(allProductsAreLoading(false));

                return response;
            })
            .then((response) => dispatch(allProductsFetchDataSuccess(response.data)))
            .catch(() => dispatch(allProductsHaveError(true)));
    };
}

// fetch cart items
export function allCartItemsHaveError(bool) {
    return {
        type: 'CART_ITEMS_ERROR',
        hasError: bool,
    };
}

export function allCartItemsAreLoading(bool) {
    return {
        type: 'CART_ITEMS_LOADING',
        isLoading: bool,
    };
}

export function allCartItemsFetchDataSuccess(cartItems) {
    return {
        type: 'CART_ITEMS_SUCCESS',
        cartItems,
    };
}

export function getCartItems() {
    return (dispatch) => {
        dispatch(allCartItemsAreLoading(true));

        axios
            .get('http://localhost:8082/orderline/getCart', {
                headers: {
                    "Authorization": token
                }
            })
            .then((response) => {
                if (response.status !== 200) {
                    throw Error(response.statusText);
                }

                dispatch(allCartItemsAreLoading(false));

                return response;
            })
            .then((response) => dispatch(allCartItemsFetchDataSuccess(response.data)))
            .catch(() => dispatch(allCartItemsHaveError(true)));
    };
}

// Remove cart item

export function removeCartItemHaveError(bool) {
    return {
        type: 'REMOVE_CART_ITEM_ERROR',
        hasError: bool,
    };
}

export function removeCartItemAreLoading(bool) {
    return {
        type: 'REMOVE_CART_ITEM_LOADING',
        isLoading: bool,
    };
}

export function removeCartItemFetchDataSuccess(cartItems) {
    return {
        type: 'REMOVE_CART_ITEM_SUCCESS',
        cartItems,
    };
}

export function deleteCartItem({ itemId }) {
    return (dispatch) => {
        dispatch(removeCartItemAreLoading(true));

        axios
            .delete(`http://localhost:8082/orderline/${itemId}`, {
                headers: {
                    "Authorization": token
                }
            })
            .then((response) => {
                if (response.status !== 200) {
                    throw Error(response.statusText);
                }

                dispatch(removeCartItemAreLoading(false));
                dispatch(getCartItems());

                return response;
            })
            .then((response) => dispatch(removeCartItemFetchDataSuccess(response.data)))
            .catch(() => dispatch(removeCartItemHaveError(true)));
    };
}
