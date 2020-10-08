import {createStore, combineReducers} from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import portfolioReducer from './portfolioReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    portfolio: portfolioReducer
});

export default createStore(rootReducer);