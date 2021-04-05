import { LOAD_MEASURES,
        FAILED_LOAD_MEASURES,
    CLEAR_MEASURES
} from "../types"

const INITIAL_STATE = {

}

const measureReducer = (currentState = INITIAL_STATE, {type, payload}) => {
    switch (type) {
        case LOAD_MEASURES: {
            return {
                ...currentState,
                ...payload
            }
        }
        case CLEAR_MEASURES:{
            return {}
        }
        default:
            return currentState;
    }
}

export default measureReducer;
