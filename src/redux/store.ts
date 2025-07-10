import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import authReducer from "./features/authSlice";
import cartReducer from "./features/cart/cartSlice";
import wishListReducer from "./features/wishList/wishListSlice";
import categoryReducer from "./features/category/CategorySlice";
const persistAuthConfig = {
  key: "auth",
  storage,
};
const persistCartConfig = {
  key: "cart",
  storage,
};
const persistWishListConfig = {
  key: "wishList",
  storage,
};

const persistedAuthReducer = persistReducer(persistAuthConfig, authReducer);
const persistedCartReducer = persistReducer(persistCartConfig, cartReducer);
const persistedWishListReducer = persistReducer(
  persistWishListConfig,
  wishListReducer
);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedAuthReducer,
    category: categoryReducer,
    cart: persistedCartReducer,
    wishList: persistedWishListReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
