import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  userInfo: null,
  favorites: [],
};

export const amazonSlice = createSlice({
  name: 'amazon',
  initialState,
  reducers: {
    getQuantity: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload.id);
      if (item) {
        state.quantityOfSelectedProduct = item.quantity;
      } else {
        state.quantityOfSelectedProduct = 0;
      }
    },
    addToCart: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
    },
    addToWishList: (state, action) => {
      const item = state.favorites.find(
        (item) => item.id === action.payload.id
      );
      if (!item) {
        state.favorites.push(action.payload);
      }
    },
    removeFromWishList: (state, action) => {
      state.favorites = state.favorites.filter(
        (item) => item.id !== action.payload.id
      );
    },
    deleteItem: (state, action) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload.id
      );
    },
    resetCart: (state) => {
      state.products = [];
    },
    incrementQuantity: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity++;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload.id);
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },

    // user authentication
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    userSignOut: (state) => {
      state.userInfo = null;
    },
  },
});
export const {
  addToCart,
  resetCart,
  deleteItem,
  incrementQuantity,
  decrementQuantity,
  setUserInfo,
  userSignOut,
  removeFromWishList,
  addToWishList,
} = amazonSlice.actions;

export default amazonSlice.reducer;
