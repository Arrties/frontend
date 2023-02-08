import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from '../helper';

export interface Token {
  accessToken: string | undefined;
  refreshToken: string | undefined;
  roles: string | undefined;
}

const TOKEN_KEY = '@token';

export const getToken = (): Token => {
  const token = getLocalStorage<Token>(TOKEN_KEY, {
    accessToken: undefined,
    refreshToken: undefined,
    roles: undefined,
  });
  return token;
};

export const setToken = (token: Token) => {
  setLocalStorage(TOKEN_KEY, token);
};

export const deleteToken = () => {
  removeLocalStorage(TOKEN_KEY);
};
