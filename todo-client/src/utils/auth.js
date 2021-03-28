export const TOKEN_KEY = "token";
export const TOKEN_USR = "user";

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const getUser = () => localStorage.getItem(TOKEN_USR);

export const login = (token, user) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(TOKEN_USR, user);
};

export const logout = () => {
  localStorage.clear();
};
