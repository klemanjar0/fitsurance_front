import {
    SET_CURRENT_USER,
    CLEAR_CURRENT_USER,
    FAILED_REGISTER,
    SET_USER_TOKEN,
    FAILED_LOGIN,
} from "../types"

export const setCurrentUser = () => SET_CURRENT_USER

export const clearCurrentUser = () => CLEAR_CURRENT_USER

export const failedRegister = () => FAILED_REGISTER

export const failedLogin = () => FAILED_LOGIN

export const setUserToken = () => SET_USER_TOKEN
