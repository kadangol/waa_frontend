import { combineReducers } from 'redux';
import itemReducer from './items';
import userReducer from './users';
import sellerProductReducer from './sellerProduct';

export default combineReducers({
    itemReducer,
    userReducer,
    sellerProductReducer
});
