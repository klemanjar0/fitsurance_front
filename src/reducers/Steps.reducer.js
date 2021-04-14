import { LOAD_STEPS,
    FAILED_LOAD_STEPS,
    CLEAR_STEPS
} from "../types"

const INITIAL_STATE = {

}

const stepsReducer = (currentState = INITIAL_STATE, {type, payload}) => {
    switch (type) {
        case LOAD_STEPS: {
            return {
                ...currentState,
                ...payload
            }
        }
        case CLEAR_STEPS:{
            return {}
        }
        default:
            return currentState;
    }
}

export default stepsReducer;
