// store.js

import { configureStore } from '@reduxjs/toolkit';
import { carrinhoReducer } from './reducers.js';
import { userReducer } from './userReducer.js';

const store = configureStore({
  reducer: {
    carrinho: carrinhoReducer,
    user: userReducer,
  },

});

export default store;
