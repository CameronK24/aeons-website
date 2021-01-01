const initialState = {
    navBarColor: 'nav-bar-color-1',
    buttonColor: 'auth-btn',
    sideProfileColor: 'side-profile-color-1',
    backgroundImage: "url('https://i.pinimg.com/originals/a0/de/1d/a0de1dd5d13217683f21e4e525193069.jpg')"
}

const CHANGENAVCOLOR = 'CHANGENAVCOLOR';
const CHANGEBTNCOLOR = 'CHANGEBTNCOLOR';
const CHANGESIDECOLOR = 'CHANGESIDECOLOR';
const CHANGEBACKGROUNDIMAGE = 'CHANGEBACKGROUNDIMAGE';

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

export const changeBackgroundImage = (image) => {
    return {
        type: CHANGEBACKGROUNDIMAGE,
        payload: image
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
        case CHANGEBACKGROUNDIMAGE:
            return {...state, backgroundImage: action.payload};
        default:
            return state;
    }
}