import axios from 'axios';

// fetch token from localstorage
let userDetails = localStorage.getItem('userDetails')
let token = ''
if (userDetails) {
    userDetails = JSON.parse(userDetails)
    token = `Bearer ${userDetails.accessToken}`
}


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
          .post(`http://localhost:8082/product`, productData, {
              headers: {
                  "Authorization": token
              }
          })
          .then((response) => {
              if (response.status !== 200) {
                  throw Error(response.statusText);
              }

              dispatch(postProductLoading(false));
              window.location.href="/product"

              return response;
          })
          .then((response) => dispatch(postProductSuccess(response.data)))
          .catch(() => dispatch(postProductError(true)));
  };
}
