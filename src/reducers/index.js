import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import appReducer from './App.reducer';
import localeReducer from "./Locale.reducer";
import currentUserReducer from "./CurrentUser.reducer";


export default combineReducers({
    app: appReducer,
    currentUser: currentUserReducer,
    routing: routerReducer,
    locale: localeReducer
})
