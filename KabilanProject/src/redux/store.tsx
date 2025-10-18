import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
 
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage'; // For React Native
import counterReducer from './slice/counterSlice';
import tempcounterReducer from './slice/TempCounterSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['Counter'],
  blacklist: ['tempcounter'],
};

const rootReducer = combineReducers({
  Counter: counterReducer,
  tempcounter : tempcounterReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
 
    });


    
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
