const initialState = {
    navBarColor: 'nav-bar-color-1',
    buttonColor: 'auth-btn'
}

const CHANGENAVCOLOR = 'CHANGENAVCOLOR';
const CHANGEBTNCOLOR = 'CHANGEBTNCOLOR';

export const changeNavColor = (cssClass) => {
    return {
        type: CHANGENAVCOLOR,
        payload: cssClass
    }
}

export const changeBtnColor = (cssClass) => {
    return {
        type: CHANGEBTNCOLOR,
        payload: cssClass
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case CHANGENAVCOLOR:
            return {...state, navBarColor: action.payload};
        case CHANGEBTNCOLOR:
            return {...state, buttonColor: action.payload};
        default:
            return state;
    }
}