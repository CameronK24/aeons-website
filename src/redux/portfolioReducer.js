const initialState = {
    navBarColor: 'nav-bar-color-1',
    buttonColor: 'auth-btn',
    sideProfileColor: 'side-profile-color-1'
}

const CHANGENAVCOLOR = 'CHANGENAVCOLOR';
const CHANGEBTNCOLOR = 'CHANGEBTNCOLOR';
const CHANGESIDECOLOR = 'CHANGESIDECOLOR';

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

export const changeSideColor = (cssClass) => {
    return {
        type: CHANGESIDECOLOR,
        payload: cssClass
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case CHANGENAVCOLOR:
            return {...state, navBarColor: action.payload};
        case CHANGEBTNCOLOR:
            return {...state, buttonColor: action.payload};
        case CHANGESIDECOLOR:
            return {...state, sideProfileColor: action.payload};
        default:
            return state;
    }
}