import { SET_LOGIN_STATUS, LOGOUT, SET_USERNAME_STATUS } from '../redux/ReduxType';

const initialState = {
  isLoggedIn: false,
  hasusername:false,
};

const authReducer = (
  state = initialState,
  action: { type: string; payload?: any },
) => {
  switch (action.type) {
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
    case SET_USERNAME_STATUS:
      return {
        ...state,
        hasusername: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;
