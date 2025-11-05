import { LOGOUT,SET_LOGIN_STATUS, SET_USERNAME_STATUS  } from '../redux/ReduxType';

export const setLoginStatus = (status: boolean) => ({
  type: SET_LOGIN_STATUS,
  payload: status,
});

export const setUsernameStatus = (status: boolean) => ({
  type: SET_USERNAME_STATUS,
  payload: status,
});

export const logout = () => ({
  type: LOGOUT,
});
