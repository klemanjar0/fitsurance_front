import {
    SET_CURRENT_USER,
    CLEAR_CURRENT_USER, SET_USER_TOKEN
} from "../types"

const INITIAL_STATE = {
}

const currentUserReducer = (currentState = INITIAL_STATE, {type, payload}) => {
        switch (type) {
            case SET_CURRENT_USER: {
                return {
                    ...currentState,
                    id: payload.id,
                    email: payload.email,
                    name: payload.name,
                    firstname: payload.firstname,
                    lastname: payload.lastname,
                    password: payload.password,
                    phone: payload.phone,
                    description: payload.description,
                    sex: payload.sex,
                    birthday: payload.birthday,
                    image: payload.image,
                    token: payload.token
                };
            }
            case SET_USER_TOKEN: {
                return {
                    ...currentState,
                    token: payload.token
                }
            }
            case CLEAR_CURRENT_USER: {
                return {};
            }
            default:
                return currentState;
        }
}

export default currentUserReducer;
