import {
    SET_CURRENT_USER,
    CLEAR_CURRENT_USER,
} from "../types"

export const setCurrentUser = () => {
    return {
        type: SET_CURRENT_USER
    }
}
export const clearCurrentUser = () => {
    return {
        type: CLEAR_CURRENT_USER
    }
}

