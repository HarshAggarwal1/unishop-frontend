import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/theme/themeSlice';
import cartReducer from './slices/cart/cartSlice';
import loginReducer from './slices/login/loginSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    cart: cartReducer,
    login: loginReducer,
  },
});
