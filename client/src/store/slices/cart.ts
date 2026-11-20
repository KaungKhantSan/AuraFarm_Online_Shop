import { createSlice } from "@reduxjs/toolkit";

export interface cartItem {
  key?: string; // unique productId_size_color
  productId: string;
  name: string;
  price: number;
  quantity: number;
  color: string;
  size: string;
  image: string;
}

export interface cartState {
  item: cartItem[];
}

const initialState: cartState = {
  item: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const { productId, name, price, quantity, color, size, image } =
        action.payload;
      const key = `${productId}_${color}_${size}`;
      const existing = state.item.find((item) => item.key === key);
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.item.push({
          productId,
          key,
          name,
          price,
          quantity,
          color,
          size,
          image,
        });
      }
    },
    increaseQuantity(state, action) {
      const existing = state.item.find((item) => item.key === action.payload);
      if (existing) {
        existing.quantity += 1;
      }
    },
    decreaseQuantity(state, action) {
      const existing = state.item.find((item) => item.key === action.payload);
      if (existing) {
        existing.quantity -= 1;
      }
      if (existing?.quantity === 0) {
        state.item = state.item.filter((item) => item.key !== action.payload);
      }
    },
    removeItemInCart(state, action) {
      state.item = state.item.filter((item) => item.key !== action.payload);
    },
    clearCart(state) {
      state.item = [];
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeItemInCart,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
