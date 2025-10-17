import { createSlice } from '@reduxjs/toolkit';
import { InitialStateType } from '../ReduxTypes';



const initialState: InitialStateType = {
  
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    address: {
    street: "Kulas Light",
    suite: "Apt. 556",
    city: "Gwenborough",
    zipcode: "92998-3874",
    geo: {
    lat: "-37.3159",
    lng: "81.1496"
      }
    },
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
    company: {
    name: "Romaguera-Crona",
    catchPhrase: "Multi-layered client-server neural-net",
    bs: "harness real-time e-markets"
    }
  
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState: initialState, 
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;

export const selectCount = (state: { counter: InitialStateType }) => state.counter.value;

export default counterSlice.reducer;