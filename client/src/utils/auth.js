const TOKEN_KEY = 'token';
const USER_KEY = 'username';

const getToken = () => localStorage.getItem(TOKEN_KEY);
const getUsername = () => localStorage.getItem(USER_KEY);

const saveAuth = (token, username) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, username);
};

const clearAuth = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export { getToken, getUsername, saveAuth, clearAuth };