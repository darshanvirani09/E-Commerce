import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: {}, // { productId: quantity }
    totalCount: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const id = action.payload;
      if (state.cart[id]) {
        state.cart[id] += 1;
      } else {
        state.cart[id] = 1;
      }
      state.totalCount += 1;
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      if (state.cart[id]) {
        state.totalCount -= 1;
        state.cart[id] -= 1;
        if (state.cart[id] === 0) {
          delete state.cart[id];
        }
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
