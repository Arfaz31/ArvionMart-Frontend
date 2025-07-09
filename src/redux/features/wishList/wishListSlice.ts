import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IWishList {
  productId: string;
  productName: string;
  sku: string;
  brandName: string;
  sellingPrice: number;
  discount?: number;
  image: string;
}

interface IWishListState {
  items: IWishList[];
}

const initialState: IWishListState = {
  items: [],
};

const wishListSlice = createSlice({
  name: "wishList",
  initialState,
  reducers: {
    addProductToWishList: (state, action: PayloadAction<IWishList>) => {
      const existingItem = state.items.find(
        (item) => item.productId === action.payload.productId
      );

      if (!existingItem) {
        state.items.push(action.payload);
      }
    },

    removeProductFromWishList: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload
      );
    },

    clearWishList: (state) => {
      state.items = [];
    },
  },
});

export const {
  addProductToWishList,
  removeProductFromWishList,
  clearWishList,
} = wishListSlice.actions;

// Selectors
export const selectWishListItems = (state: { wishList: IWishListState }) =>
  state.wishList.items;
export const selectWishListCount = (state: { wishList: IWishListState }) =>
  state.wishList.items.length;
export const selectIsInWishList =
  (productId: string) => (state: { wishList: IWishListState }) =>
    state.wishList.items.some((item) => item.productId === productId);

// Helper selector to calculate discounted price
export const selectWishListWithDiscount = (state: {
  wishList: IWishListState;
}) =>
  state.wishList.items.map((item) => ({
    ...item,
    discountedPrice: item.discount
      ? item.sellingPrice * (1 - item.discount / 100)
      : item.sellingPrice,
  }));

export default wishListSlice.reducer;
