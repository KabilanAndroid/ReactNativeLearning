import { createSlice } from '@reduxjs/toolkit';
import { StateTypeForRedux } from './ReduxType';

const initialState: StateTypeForRedux = {
  isLoggedIn: false,
  hasusernames: false,
  userid: '',
  username: '',
  getting :false,
};

export const Authslice = createSlice({
  name: 'Authentication',
  initialState: initialState,
  reducers: {
    setlogin: (state, action) => {
      state.isLoggedIn = true;
      state.userid = action.payload;
      console.log("actionand payload:",action.payload);
    },
    setlogout: state => {
      state.isLoggedIn = false;
    },

    setusername: state => {
      state.hasusernames = true;
    },
    setusernamefalse: state => {
      state.hasusernames = false;
    },
    setusernameredux:(state, action) =>{
      state.getting = true;
      state.username = action.payload
    }
  },
});
export const { setlogin, setusername, setlogout ,setusernamefalse,setusernameredux} = Authslice.actions;
export default Authslice.reducer;
