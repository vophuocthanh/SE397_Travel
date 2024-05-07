import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ReactNode } from 'react';

interface Product {
  image: string | undefined;
  location: string;
  price: number;
  name: ReactNode;
  id: number;
  quantity: number;
}

export interface CounterState {
  CartArr: Product[];
  orderId: string | null;
  usersWhoOrdered: string[];
}

const initialState: CounterState = {
  CartArr: [],
  orderId: null,
  usersWhoOrdered: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      const productIndex = state.CartArr.findIndex(
        (item) => item.id === action.payload.id
      );
      if (productIndex === -1) {
        state.CartArr.push({ ...action.payload, quantity: 1 });
      } else {
        state.CartArr[productIndex].quantity += 1;
      }
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      const productIdToRemove = action.payload;
      const newCart = state.CartArr.filter(
        (item) => item.id !== productIdToRemove
      );
      state.CartArr = newCart;
    },
    clearCart: (state) => {
      state.CartArr = [];
    },
    setOrderId: (state, action: PayloadAction<string>) => {
      state.orderId = action.payload;
    },
    addUserToOrderList: (state, action: PayloadAction<string>) => {
      state.usersWhoOrdered.push(action.payload);
    },
  },
});

export const {
  addProduct,
  deleteProduct,
  clearCart,
  setOrderId,
  addUserToOrderList,
} = productSlice.actions;
export default productSlice.reducer;
