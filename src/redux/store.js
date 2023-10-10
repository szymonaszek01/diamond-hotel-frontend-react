import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';
import authReducer from '../redux/features/authSlice.js';
import userReducer from './features/userSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storageSession from 'reduxjs-toolkit-persist/lib/storage/session';

const persistConfig = {
  key: 'root',
  storage: storageSession,
};

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export const persistor = persistStore(store);
