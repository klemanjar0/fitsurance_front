import { FetchError } from './FetchError';
import { configuredFetch } from './configuredFetch';
import {failedLogin, failedRegister, setCurrentUser} from "../actions/SignUp.actions";
import {
    failedLoadMeasures,
    failedLoadPulse,
    failedLoadSteps,
    loadMeasures,
    loadPulse,
    loadSteps
} from "../actions/Measure.actions";


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



export const fetchMeasures = async (id) => {
    const response = await configuredFetch(
        `/measure/getByUser/${id}`,
        'GET',

        {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    );

    const data = await response.json();
    if (response.ok) {
        return await JSON.parse(JSON.stringify(data));
    }
    throw new FetchError({ ...data, status: response.status });
};

export const getMeasures = ( payload ) => {
    return (dispatch) => {
        return fetchMeasures(payload).then(
            (data) => {dispatch( {type : loadMeasures(), payload: {data}})},
            (error)=>{ dispatch({type: failedLoadMeasures()})}
        )
    }
};

export const fetchSteps = async (id) => {
    const response = await configuredFetch(
        `/user/${id}/getsleep`,
        'GET',

        {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    );

    const data = await response.json();

    if (response.ok) {
        return await JSON.parse(JSON.stringify(data));
    }
    throw new FetchError({ ...data, status: response.status });
};
export const getSteps = ( payload ) => {
    return (dispatch) => {
        return fetchSteps(payload).then(
            (data) => {dispatch( {type : loadSteps(), payload: {data}})},
            (error)=>{ dispatch({type: failedLoadSteps()})}
        )
    }
};


export const fetchPulse = async (id) => {
    const response = await configuredFetch(
        `/user/${id}/getpulse`,
        'GET',

        {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    );

    const data = await response.json();

    if (response.ok) {
        return await JSON.parse(JSON.stringify(data));
    }
    throw new FetchError({ ...data, status: response.status });
};
export const getPulse = ( payload ) => {
    return (dispatch) => {
        return fetchPulse(payload).then(
            (data) => {dispatch( {type : loadPulse(), payload: {data}})},
            (error)=>{ dispatch({type: failedLoadPulse()})}
        )
    }
};

export const fetchUsers = async () => {
    const response = await configuredFetch(
        `/user/getAllUsers`,
        'GET',

        {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    );

    const data = await response.json();
    if (response.ok) {
        return await JSON.parse(data);
    }
    throw new FetchError({ ...data, status: response.status });
};
export const fetchDeleteUser = async (id) => {
    const response = await configuredFetch(
        `/user/delete/${id}`,
        'DELETE',

        {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    );
    const data = await response.json();
    if (response.ok) {
        return data;
    }
    throw new FetchError({ ...data, status: response.status });
};
