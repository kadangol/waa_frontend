import axios from 'axios';

// fetch token from localstorage
let userDetails = localStorage.getItem('userDetails')
let token = ''
if (userDetails) {
    userDetails = JSON.parse(userDetails)
    token = `Bearer ${userDetails.accessToken}`
}

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
        console.log(loginData, 'loginData')
        dispatch(loginLoading(true));


        axios
            .post('http://localhost:8082/api/auth/signin', {
                "username": loginData.user,
                "password": loginData.password,
                // "password": "string",
                // "username": "admin"
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
                localStorage.setItem('userDetails', JSON.stringify(response.data));
                window.location.href = "/home"
            })
            .catch(() => dispatch(loginError(true)));
    };
}


// Register actions
export function register(registerData) {
    return (dispatch) => {
        console.log(registerData, 'registerData')
        dispatch(loginLoading(true));

        const url = `http://localhost:8082/${registerData.status === 'buyer' ? 'buyer' : 'seller'}/sign-up`

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
    window.location.href = "/home"
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
            .get('http://localhost:8082/seller/unapprovedSellers', {
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
            .put(`http://localhost:8082/seller/${id}/approve`, {
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
            .put(`http://localhost:8082/seller/${id}/reject`, {
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
