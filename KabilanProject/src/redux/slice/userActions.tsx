import { LOGOUT, SET_LOGIN_STATUS, SET_SIGNUP_DATA } from '../SignupTypes';

export const setSignupData = (
  username: String,
  password: String,
  email: String,
  confirmpassword: String,
) => ({
  type: SET_SIGNUP_DATA,
  payload: { username, password, email, confirmpassword },
});

export const setLoginStatus = (status: boolean) => ({
  type: SET_LOGIN_STATUS,
  payload: status,
});

export const logout = () => ({
  type: LOGOUT,
});
