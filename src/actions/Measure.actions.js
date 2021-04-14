import {
    LOAD_MEASURES,
    FAILED_LOAD_MEASURES,
    CLEAR_MEASURES
} from "../types"

export const loadMeasures = () => LOAD_MEASURES

export const failedLoadMeasures = () => FAILED_LOAD_MEASURES

export const clearMeasures = () => CLEAR_MEASURES

export const loadSteps = () => "LOAD_STEPS"

export const failedLoadSteps = () => "FAILED_LOAD_STEPS"
export const clearSteps = () => "CLEAR_STEPS"

export const loadPulse = () => "LOAD_PULSE"
export const failedLoadPulse = () => "FAILED_LOAD_PULSE"
export const clearPulse = () =>  "CLEAR_PULSE"
