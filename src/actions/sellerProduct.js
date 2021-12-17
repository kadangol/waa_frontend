import axios from 'axios';

// fetch token from localstorage
let userDetails = localStorage.getItem('userDetails')
let token = ''
if (userDetails) {
    userDetails = JSON.parse(userDetails)
    token = `Bearer ${userDetails.accessToken}`
}

const BASE_URL = process.env.REACT_APP_BASE_URL

// Add Product

export function postProductError(bool) {
    return {
        type: 'POST_PRODUCT_ERROR',
        hasError: bool,
    };
}

export function postProductLoading(bool) {
    return {
        type: 'POST_PRODUCT_LOADING',
        isLoading: bool,
    };
}

export function postProductSuccess(data) {
    return {
        type: 'POST_PRODUCT_SUCCESS',
        data,
    };
}

export function postProduct(productData) {
    return (dispatch) => {
        dispatch(postProductLoading(true));

        axios
            .post(`${BASE_URL}/product`, productData, {
                headers: {
                    "Authorization": token
                }
            })
            .then((response) => {
                if (response.status !== 200) {
                    throw Error(response.statusText);
                }

                dispatch(postProductLoading(false));
                // window.location.href = "/product"

                return response;
            })
            .then((response) => dispatch(postProductSuccess(response.data)))
            .catch(() => dispatch(postProductError(true)));
    };
}

// Fetch seller products

export function getSellerProductsError(bool) {
    return {
        type: 'GET_SELLER_PRODUCT_ERROR',
        hasError: bool,
    };
}

export function getSellerProductsLoading(bool) {
    return {
        type: 'GET_SELLER_PRODUCT_LOADING',
        isLoading: bool,
    };
}

export function getSellerProductsSuccess(data) {
    return {
        type: 'GET_SELLER_PRODUCT_SUCCESS',
        data,
    };
}

export function getSellerProducts({ sellerId }) {
    return (dispatch) => {
        dispatch(getSellerProductsLoading(true));

        axios
            .get(`${BASE_URL}/product/findProductBySeller/${sellerId}`, {
                headers: {
                    "Authorization": token
                }
            })
            .then((response) => {
                if (response.status !== 200) {
                    throw Error(response.statusText);
                }

                dispatch(getSellerProductsLoading(false));

                return response;
            })
            .then((response) => { dispatch(getSellerProductsSuccess(response.data)) })
            .catch(() => dispatch(getSellerProductsError(true)));
    };
}


// Delete prodcut

export function deleteSellerProductError(bool) {
    return {
        type: 'DELETE_SELLER_PRODUCT_ERROR',
        hasError: bool,
    };
}

export function deleteSellerProductLoading(bool) {
    return {
        type: 'DELETE_SELLER_PRODUCT_LOADING',
        isLoading: bool,
    };
}

export function deleteSellerProductSuccess(data) {
    return {
        type: 'DELETE_SELLER_PRODUCT_SUCCESS',
        data,
    };
}

export function deleteProduct({ id, sellerId }) {
    return (dispatch) => {
        dispatch(deleteSellerProductLoading(true));
        console.log({ id, sellerId })

        axios
            .delete(`${BASE_URL}/product/${id}`, {
                headers: {
                    "Authorization": token
                }
            })
            .then((response) => {
                if (response.status !== 200) {
                    throw Error(response.statusText);
                }

                dispatch(deleteSellerProductLoading(false));
                dispatch(getSellerProducts({ sellerId }))

                return response;
            })
            .then((response) => { dispatch(deleteSellerProductSuccess(response.data)) })
            .catch(() => dispatch(deleteSellerProductError(true)));
    };
}