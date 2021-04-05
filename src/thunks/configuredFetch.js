
let jwtToken;

export const setToken = (token) => {
    jwtToken = token;
};

export const configuredFetch = (url = '/', method = 'GET', headers = {}, body) => {
    const configuredHeaders = jwtToken
        ? { ...headers, Authorization: jwtToken }
        : headers;

    return fetch(`http://localhost:3001${url}`, {
        method,
        headers: configuredHeaders,
        body: JSON.stringify(body),
    });
};
