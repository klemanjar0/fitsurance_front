import { FetchError } from './FetchError';
import { configuredFetch } from './configuredFetch';
import {failedLogin, failedRegister, setCurrentUser} from "../actions/SignUp.actions";


export const fetchRegister = async (user) => {
    const response = await configuredFetch(
        '/user/register',
        'POST',

        {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        {
            ...user,
        },
    );

    const data = await response.json();
    if (response.ok) {
        console.log(data)
        return data;
    }
    throw new FetchError({ ...data, status: response.status });
};

export const userRegisterRequest = ( payload ) => {
    return (dispatch) => {
        return fetchRegister(payload).then(
            (data) => { dispatch({type : setCurrentUser(), payload: {...data.user, token: data.token}})},
            (error)=>{ dispatch({type: failedRegister()})}
        )
    }
};


export const fetchLogin = async (user) => {
    const response = await configuredFetch(
        '/user/login',
        'POST',

        {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        {
            ...user,
        },
    );

    const data = await response.json();
    if (response.ok) {
        return data;
    }
    throw new FetchError({ ...data, status: response.status });
};

export const userLoginRequest = ( payload ) => {
    return (dispatch) => {
        return fetchLogin(payload).then(
            (data) => {dispatch( {type : setCurrentUser(), payload: {...data.user, token: data.token}})},
            (error)=>{ dispatch({type: failedLogin()})}
        )
    }
};
