import { SET_SIGNUP_DATA, SET_LOGIN_STATUS, LOGOUT } from '../SignupTypes';

const initialState = {
  username: '',
  email: '',
  password: '',
  confirmpassword: '',
};

const authReducer = (
  state = initialState,
  action: { type: string; payload?: any },
) => {
  switch (action.type) {
    case SET_SIGNUP_DATA:
      return {
        ...state,
        ...action.payload,
      };

    case SET_LOGIN_STATUS:
      return {
        ...state,
        isLoggedIn: action.payload,
      };

    case LOGOUT:
      return {
        ...initialState,
        isLoggedIn: false,
      };

    default:
      return state;
  }
};

export default authReducer;
