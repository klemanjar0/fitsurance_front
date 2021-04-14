import {SET_DISCOUNT, CLEAR_DISCOUNT} from "../types";

const INITIAL_STATE = {
    discount: 0
}

const appReducer = (currentState = INITIAL_STATE, {type, payload}) => {
    switch (type) {
        case SET_DISCOUNT: {
            return {
                discount: payload.discount
            }
        }
        case CLEAR_DISCOUNT: {
            return {
                discount: 0
            }
        }
        default:
            return currentState;
    }
}

export default appReducer;
