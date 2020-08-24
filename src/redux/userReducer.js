const initialState = {
    userId: '',
    email: '',
    characterName: '',
    avatar: '',
    portrait: '',
}

const STORE_USER_INFO = 'STORE_USER_INFO';

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

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case STORE_USER_INFO:
            const {userId, email, characterName, avatar, portrait} = action.payload;
            return {
                userId: userId,
                email: email,
                characterName: characterName,
                avatar: avatar,
                portrait: portrait
            };    
        default:
            return state;
    }
}