const AUTH_TOKEN_KEY = "backend_auth_token";

const setBackendAuthToken = v => localStorage.setItem(AUTH_TOKEN_KEY, v);
const getBackendAuthToken = () => localStorage.getItem(AUTH_TOKEN_KEY);
const isBackendAuthTokenValid = () => getBackendAuthToken() !== null;
const deleteBackendAuthToken = () => localStorage.removeItem(AUTH_TOKEN_KEY);

export {
    setBackendAuthToken,
    getBackendAuthToken,
    isBackendAuthTokenValid,
    deleteBackendAuthToken
}