const initialState = { 
    register: false,
    loggedIn: true
}

const REGISTERING = 'REGISTERING';
const NOT_REGISTERING = 'NOT_REGISTERING';
const LOGGINGIN = 'LOGGINGIN';
const LOGOUT = 'LOGOUT';

export const registerUser = () => {
    return {
        type: REGISTERING,
        payload: true
    }
}

export const notRegisteringUser = () => {
    return {
        type: NOT_REGISTERING,
        payload: false
    }
}

export const loginUser = () => {
    return {
        type: LOGGINGIN,
        payload: true
    }
}

export const logoutUser = () => {
    return {
        type: LOGOUT,
        payload: false
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {  
        case REGISTERING:
            return {...state, register: action.payload};
        case NOT_REGISTERING:
            return {...state, register: action.payload};
        case LOGGINGIN:
            return {...state, loggedIn: action.payload};
        case LOGOUT:
            return {...state, loggedIn: action.payload};
        default:
            return state;
    }
}