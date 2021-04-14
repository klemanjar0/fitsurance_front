import { LOAD_PULSE,
    CLEAR_PULSE
} from "../types"

const INITIAL_STATE = {

}

const pulseReducer = (currentState = INITIAL_STATE, {type, payload}) => {
    switch (type) {
        case LOAD_PULSE: {
            return {
                ...currentState,
                ...payload
            }
        }
        case CLEAR_PULSE:{
            return {}
        }
        default:
            return currentState;
    }
}

export default pulseReducer;
