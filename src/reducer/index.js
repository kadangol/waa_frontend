import { combineReducers } from 'redux';
import itemReducer from './items';
import userReducer from './users';

export default combineReducers({
    itemReducer,
    userReducer
});
