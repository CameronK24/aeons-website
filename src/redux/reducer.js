const initialState = {
    characterName: null,
    profilePic: null,
    register: false
}

const STORE_USER_INFO = 'STORE_USER_INFO';
const REGISTERING = 'REGISTERING';

export const storeUserInfo = (characterName, profilePic) => {
    return {
        type: STORE_USER_INFO,
        payload: {
            characterName,
            profilePic
        }
    }
}

export const registerUser = (register) => {
    return {
        type: REGISTERING,
        payload: {
            register
        }
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case STORE_USER_INFO:
            const {characterName, profilePic} = action.payload;
            return {characterName, profilePic};    
        case REGISTERING:
            const {register} = action.payload;
            return {register};
        default:
            return state;
    }
}