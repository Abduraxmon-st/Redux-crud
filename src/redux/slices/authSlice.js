import { TOKEN } from '@/constants';
import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    auth: Cookies.get(TOKEN) ? true : false,
    cart: [],
    wishList: [],
  },
  reducers: {
    login: (state, action) => {
      state.auth = true;
      Cookies.set(TOKEN, action.payload.token);
    },
    logout: (state) => {
      state.auth = false;
      Cookies.remove(TOKEN);
    },
    addToCart: (state, action) => {
      const exisiting = state.cart.find((el) => el.id === action.payload.id);
      if (exisiting) {
        exisiting.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    DelProductInCart: (state, action) => {
      const exisiting = state.cart.filter((el) => el.id !== action.payload.id);
      state.cart = exisiting
    },
    DelAllInCart: (state) => {
      state.cart = []
    },
    addWishlist: (state, action) => {
      const exisiting = state.wishList.find((el) => el.id === action.payload.id);
      if (exisiting) {
        const exisiting = state.wishList.filter((el) => el.id !== action.payload.id);
        state.wishList = exisiting
      } else {
        state.wishList.push(action.payload);
      }
    },
    removeWishProduct: (state, action) => {
      state.wishList = state.wishList.filter(item => item.id !== action.payload);
    },
    DelAllInWishlist: (state) => {
      state.wishList = []
    },
    incremented: state => {
      state.value += 1
    },
    decremented: state => {
      if (state.value > 0) {
        state.value -= 1
      }
    }
  },
});

export const { login, logout, addToCart, DelProductInCart,DelAllInCart, addWishlist, removeWishProduct, incremented, decremented, DelAllInWishlist } = authSlice.actions;
export default authSlice.reducer;
