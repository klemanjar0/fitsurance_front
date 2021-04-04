import { SET_LOCALE } from "../types"

const INITIAL_STATE = {
    language: 'en'
}

const localeReducer = (currentState = INITIAL_STATE, {type, payload}) => {
    switch (type) {
        case SET_LOCALE: {
            return {
                language: payload.language
            }
        }
        default:
            return currentState;
    }
}

export default localeReducer;
