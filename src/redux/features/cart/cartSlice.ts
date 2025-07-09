import { TCustomerInfo, TOrderItem } from "@/types/cart";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ICartState {
  items: TOrderItem[];
  customerInfo: TCustomerInfo | null;
  shippingPrice: number;
  paymentMethod: string;
  totalPrice: number;
}

const initialState: ICartState = {
  items: [],
  customerInfo: null,
  shippingPrice: 0,
  paymentMethod: "",
  totalPrice: 0,
};

const calculateTotal = (state: ICartState) => {
  return (
    state.items.reduce((total, item) => {
      return total + item.sellingPrice * item.quantity;
    }, 0) + state.shippingPrice
  );
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<TOrderItem>) => {
      const existingItem = state.items.find(
        (item) =>
          item.productId === action.payload.productId &&
          item.variant === action.payload.variant
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      state.totalPrice = calculateTotal(state);
    },

    updateQuantity: (
      state,
      action: PayloadAction<{
        productId: string;
        variant: string;
        quantity: number;
      }>
    ) => {
      const item = state.items.find(
        (item) =>
          item.productId === action.payload.productId &&
          item.variant === action.payload.variant
      );

      if (item) {
        item.quantity = action.payload.quantity;
        state.totalPrice = calculateTotal(state);
      }
    },

    removeProduct: (
      state,
      action: PayloadAction<{ productId: string; variant: string }>
    ) => {
      state.items = state.items.filter(
        (item) =>
          item.productId !== action.payload.productId ||
          item.variant !== action.payload.variant
      );
      state.totalPrice = calculateTotal(state);
    },

    clearCart: (state) => {
      state.items = [];
      state.customerInfo = null;
      state.shippingPrice = 0;
      state.paymentMethod = "";
      state.totalPrice = 0;
    },

    setCustomerInfo: (state, action: PayloadAction<TCustomerInfo>) => {
      state.customerInfo = action.payload;
    },

    setShippingPrice: (state, action: PayloadAction<number>) => {
      state.shippingPrice = action.payload;
      state.totalPrice = calculateTotal(state);
    },

    setPaymentMethod: (state, action: PayloadAction<string>) => {
      state.paymentMethod = action.payload;
    },
  },
});

export const {
  addToCart,
  updateQuantity,
  removeProduct,
  clearCart,
  setCustomerInfo,
  setShippingPrice,
  setPaymentMethod,
} = cartSlice.actions;

export const selectCartItems = (state: { cart: ICartState }) =>
  state.cart.items;
export const selectTotalPrice = (state: { cart: ICartState }) =>
  state.cart.totalPrice;
export const selectCustomerInfo = (state: { cart: ICartState }) =>
  state.cart.customerInfo;
export const selectShippingPrice = (state: { cart: ICartState }) =>
  state.cart.shippingPrice;
export const selectPaymentMethod = (state: { cart: ICartState }) =>
  state.cart.paymentMethod;

export default cartSlice.reducer;
