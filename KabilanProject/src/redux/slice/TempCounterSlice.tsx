import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addressType, companyType, geoType, InitialStateType } from '../ReduxTypes';

const initialState: InitialStateType = {
  id: 1,
  name: 'Leanne Graham',
  username: 'Bret',
  email: 'Sincere@april.biz',
  address: {
    street: 'Kulas Light',
    suite: 'Apt. 556',
    city: 'Gwenborough',
    zipcode: '92998-3874',
    geo: {
      lat: '-37.3159',
      lng: '81.1496',
    },
  },
  phone: '1-770-736-8031 x56442',
  website: 'hildegard.org',
  company: {
    name: 'Romaguera-Crona',
    catchPhrase: 'Multi-layered client-server neural-net',
    bs: 'harness real-time e-markets',
  },
};

export const TempCounterSlice = createSlice({
  name: 'tempcounter',
  initialState: initialState,
  reducers: {
    Updatename: (state, action: PayloadAction<Partial<InitialStateType>>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    Updateaddress: (state, action: PayloadAction<Partial<addressType>>) => {
      console.log(action.payload);
      return {
        ...state,
        address: {
          ...state.address,
          ...action.payload,
        },
      };
    },
    updategeo: (state, action: PayloadAction<Partial<geoType>>) => {
      console.log(action.payload);
      return {
        ...state,
        address:{
          ...state.address,
          geo:{
            ...state.address.geo,
            ...action.payload,
          }
          
        },
      };
    },
    Updatecompany: (state, action: PayloadAction<Partial<companyType>>) => {
      console.log(action.payload);
      return {
        ...state,
        company:{
          ...state.company,
          ...action.payload,
        },
      };
    },
  },
});

export const { Updatename, Updateaddress ,updategeo,Updatecompany} = TempCounterSlice.actions;



export default TempCounterSlice.reducer;
