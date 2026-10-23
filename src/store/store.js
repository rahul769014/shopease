import { configureStore } from "@reduxjs/toolkit";
import shopReducer, { fetchProducts } from "./shopSlice";

export const store = configureStore({
  reducer: {
    shop: shopReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: {
        ignoredPaths: ["shop.allProducts"],
      },
      serializableCheck: {
        ignoredActions: [fetchProducts.fulfilled.type],
        ignoredPaths: ["shop.allProducts"],
      },
    }),
});
