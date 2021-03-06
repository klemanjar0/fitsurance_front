import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import appReducer from './App.reducer';
import localeReducer from "./Locale.reducer";
import currentUserReducer from "./CurrentUser.reducer";
import measureReducer from "./Measure.reducer";
import stepsReducer from "./Steps.reducer"
import pulseReducer from "./Pulse.reducer";

export default combineReducers({
    app: appReducer,
    currentUser: currentUserReducer,
    measures: measureReducer,
    routing: routerReducer,
    locale: localeReducer,
    steps: stepsReducer,
    pulse: pulseReducer
})
