import { CONFIG } from '@config'

import { getLocalStorage, removeLocalStorage, setLocalStorage } from '../helper'

const TOKEN_KEY = CONFIG.AUTH_TOKEN_KEY || '@token';

export type Token = {
  accessToken: string | null;
  refreshToken: string | null;
  roles: string | null;
};

export const getToken = () => {
  const token = getLocalStorage<Token>(TOKEN_KEY, {
    accessToken: null,
    refreshToken: null,
    roles: null,
  });
  return token;
};

export const setToken = (token: Token) => {
  setLocalStorage(TOKEN_KEY, token);
};

export const deleteToken = () => {
  removeLocalStorage(TOKEN_KEY);
};
