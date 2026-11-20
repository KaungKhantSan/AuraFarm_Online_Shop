import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import cartReducer, { type cartState } from "./slices/cart";
import { apiSlice } from "./slices/api";
import storage from "redux-persist/es/storage";
import { persistReducer, persistStore } from "redux-persist";

const cartPersistConfig = {
  key: "cart",
  storage,
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: persistReducer<cartState>(cartPersistConfig, cartReducer),
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
