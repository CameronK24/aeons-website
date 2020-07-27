const initialState = {
    userId: null,
    email: null,
    characterName: null,
    avatar: null,
    portrait: null,
    register: false
}

const STORE_USER_INFO = 'STORE_USER_INFO';
const REGISTERING = 'REGISTERING';

export const storeUserInfo = (userId, email, characterName, avatar, portrait) => {
    return {
        type: STORE_USER_INFO,
        payload: {
            userId,
            email,
            characterName,
            avatar,
            portrait
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
            const {characterName, avatar} = action.payload;
            return {characterName, avatar};    
        case REGISTERING:
            const {register} = action.payload;
            return {register};
        default:
            return state;
    }
}