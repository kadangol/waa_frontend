import axios from 'axios';

// fetch token from localstorage
let userDetails = localStorage.getItem('userDetails')
let token = ''
if (userDetails) {
    userDetails = JSON.parse(userDetails)
    token = `Bearer ${userDetails.accessToken}`
}

const BASE_URL = process.env.REACT_APP_BASE_URL

// Login actions
export function loginError(bool) {
    return {
        type: 'LOGIN_ERROR',
        hasError: bool,
    };
}

export function loginLoading(bool) {
    return {
        type: 'LOGIN_LOADING',
        isLoading: bool,
    };
}

export function loginSuccess(data) {
    return {
        type: 'LOGIN_SUCCESS',
        data,
    };
}

export function login(loginData) {
    return (dispatch) => {
        dispatch(loginLoading(true));


        axios
            .post(`${BASE_URL}/api/auth/signin`, {
                "username": loginData.user,
                "password": loginData.password,
            })
            .then((response) => {
                if (response.status !== 200) {
                    throw Error(response.statusText);
                }

                dispatch(loginLoading(false));

                return response;
            })
            .then((response) => {
                dispatch(loginSuccess(response.data))
                if (response.data.buyerId > 0) {
                    dispatch(fetchBuyerDetail({ id: response.data.buyerId, accessToken: response.data.accessToken }));
                    localStorage.setItem('userDetails', JSON.stringify(response.data));
                } else {
                    localStorage.setItem('userDetails', JSON.stringify(response.data));
                    window.location.href = "/home"
                }
            })
            .catch(() => dispatch(loginError(true)));
    };
}


// Register actions
export function register(registerData) {
    return (dispatch) => {
        dispatch(loginLoading(true));

        const url = `${BASE_URL}/${registerData.status === 'buyer' ? 'buyer' : 'seller'}/sign-up`

        axios
            .post(url, registerData)
            .then((response) => {
                if (response.status !== 200) {
                    throw Error(response.statusText);
                }

                dispatch(loginLoading(false));


                return response;
            })
            .then((response) => {
                dispatch(loginSuccess(response.data))
                window.location.href = "/login"
            })
            .catch(() => dispatch(loginError(true)));
    };
}


// Logout actions
export function logout() {
    localStorage.removeItem('userDetails');
    localStorage.removeItem('shippingAddress');
    window.location.href = "/home"
}

// Fetch buyer details, for shipping address
export function fetchBuyerDetailError(bool) {
    return {
        type: 'FETCH_BUYER_DATA_ERROR',
        hasError: bool,
    };
}

export function fetchBuyerDetailLoading(bool) {
    return {
        type: 'FETCH_BUYER_DATA_LOADING',
        isLoading: bool,
    };
}

export function fetchBuyerDetailSuccess(data) {
    return {
        type: 'FETCH_BUYER_DATA_SUCCESS',
        data,
    };
}

export function fetchBuyerDetail({ id, accessToken }) {
    return (dispatch) => {
        dispatch(fetchBuyerDetailLoading(true));

        axios
            .get(`${BASE_URL}/buyer/${id}`, {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            })
            .then((response) => {
                if (response.status !== 200) {
                    throw Error(response.statusText);
                }

                dispatch(fetchBuyerDetailLoading(false));

                return response;
            })
            .then((response) => {
                dispatch(fetchBuyerDetailSuccess(response.data.shippingAddress))
                localStorage.setItem('shippingAddress', JSON.stringify(response.data.shippingAddress));

                window.location.href = "/home"
            })
            .catch(() => dispatch(fetchBuyerDetailError(true)));
    };
}

// Fetching unapproved sellers
export function fetchingUnapprovedSellerListHaveError(bool) {
    return {
        type: 'FETCH_UNAPPROVED_SELLERS_LIST_ERROR',
        hasError: bool,
    };
}

export function fetchingUnapprovedSellerListAreLoading(bool) {
    return {
        type: 'FETCH_UNAPPROVED_SELLERS_LIST_LOADING',
        isLoading: bool,
    };
}

export function fetchingUnapprovedSellerListFetchDataSuccess(sellerList) {
    return {
        type: 'FETCH_UNAPPROVED_SELLERS_LIST_SUCCESS',
        sellerList,
    };
}

export function getUnApprovedSellers() {
    return (dispatch) => {
        dispatch(fetchingUnapprovedSellerListAreLoading(true));

        axios
            .get(`${BASE_URL}/seller/unapprovedSellers`, {
                headers: {
                    "Authorization": token
                }
            })
            .then((response) => {
                if (response.status !== 200) {
                    throw Error(response.statusText);
                }

                dispatch(fetchingUnapprovedSellerListAreLoading(false));

                return response;
            })
            .then((response) => dispatch(fetchingUnapprovedSellerListFetchDataSuccess(response.data)))
            .catch(() => dispatch(fetchingUnapprovedSellerListHaveError(true)));
    };
}

// Approve seller
export function postApprovalSellerError(bool) {
    return {
        type: 'POST_APPROVAL_SELLER_ERROR',
        hasError: bool,
    };
}

export function postApprovalSellerLoading(bool) {
    return {
        type: 'POST_APPROVAL_SELLER_LOADING',
        isLoading: bool,
    };
}

export function postApprovalSellerSuccess(data) {
    return {
        type: 'POST_APPROVAL_SELLER_SUCCESS',
        data,
    };
}

export function postApproveSeller({ id }) {
    return (dispatch) => {
        dispatch(postApprovalSellerLoading(true));

        axios
            .put(`${BASE_URL}/seller/${id}/approve`, { id }, {
                headers: {
                    "Authorization": token
                }
            })
            .then((response) => {
                if (response.status !== 200) {
                    throw Error(response.statusText);
                }

                dispatch(postApprovalSellerLoading(false));
                dispatch(getUnApprovedSellers());

                return response;
            })
            .then((response) => dispatch(postApprovalSellerSuccess(response.data)))
            .catch(() => dispatch(postApprovalSellerError(true)));
    };
}

// Reject seller
export function postRejectSellerError(bool) {
    return {
        type: 'FETCH_REJECT_SELLERS_LIST_ERROR',
        hasError: bool,
    };
}

export function postRejectSellerLoading(bool) {
    return {
        type: 'FETCH_REJECT_SELLERS_LIST_LOADING',
        isLoading: bool,
    };
}

export function postRejectSellerSuccess(sellerList) {
    return {
        type: 'FETCH_REJECT_SELLERS_LIST_SUCCESS',
        sellerList,
    };
}

export function postRejectSeller({ id }) {
    return (dispatch) => {
        dispatch(postRejectSellerLoading(true));

        axios
            .put(`${BASE_URL}/seller/${id}/reject`, { id }, {
                headers: {
                    "Authorization": token
                }
            })
            .then((response) => {
                if (response.status !== 200) {
                    throw Error(response.statusText);
                }

                dispatch(postRejectSellerLoading(false));
                dispatch(getUnApprovedSellers());

                return response;
            })
            .then((response) => dispatch(postRejectSellerLoading(response.data)))
            .catch(() => dispatch(postRejectSellerError(true)));
    };
}
