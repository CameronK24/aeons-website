const initialState = {
    userId: '3',
    email: 'cskelly15@gmail.com',
    characterName: 'Celestine Spiritfire',
    avatar: 'https://img2.finalfantasyxiv.com/f/374b43f915652253c3fc6ef461edac03_f0c52cc66e124fc2e641d7c21ab2ce79fc0_96x96.jpg?1595870908',
    portrait: 'https://img2.finalfantasyxiv.com/f/374b43f915652253c3fc6ef461edac03_f0c52cc66e124fc2e641d7c21ab2ce79fl0_640x873.jpg?1595870908',
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