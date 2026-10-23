import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const USERS_TOKEN_KEY = "jwt_token";

const getUserId = () => {
  const storedToken = localStorage.getItem(USERS_TOKEN_KEY);
  if (!storedToken) {
    return null;
  }

  try {
    const token = JSON.parse(storedToken);
    return typeof token === "string" ? token.split(".").pop() : null;
  } catch {
    return null;
  }
};

const readWishlistIds = () => {
  try {
    const wishlistIds = JSON.parse(localStorage.getItem("wishlist_ids") ?? "[]");
    return Array.isArray(wishlistIds) ? wishlistIds : [];
  } catch {
    return [];
  }
};

export const fetchProducts = createAsyncThunk(
  "shop/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        "https://dummyjson.com/products?limit=0",
      );
      return data.products;
    } catch {
      return rejectWithValue("Products could not be loaded. Please try again later.");
    }
  },
);

export const loadCart = createAsyncThunk(
  "shop/loadCart",
  async (_, { rejectWithValue }) => {
    const userId = getUserId();
    if (!userId) {
      return [];
    }

    try {
      const savedItems = localStorage.getItem(`cart_items_${userId}`);
      const items = savedItems ? JSON.parse(savedItems) : [];
      if (!Array.isArray(items)) {
        throw new Error("Saved cart data is invalid.");
      }
      return [...new Set(items)];
    } catch {
      toast.error("Could not load your saved cart.");
      return rejectWithValue("Could not load your saved cart.");
    }
  },
);

export const addToCart = createAsyncThunk(
  "shop/addToCart",
  async (product, { rejectWithValue }) => {
    const userId = getUserId();
    if (!userId) {
      toast.info("Please log in to add items to your cart.");
      return rejectWithValue({ message: "Please log in to add items to your cart.", auth: true });
    }

    try {
      const storageKey = `cart_items_${userId}`;
      const savedItems = localStorage.getItem(storageKey);
      const currentItems = savedItems ? JSON.parse(savedItems) : [];
      if (!Array.isArray(currentItems)) {
        throw new Error("Saved cart data is invalid.");
      }

      const itemsId = [...new Set([...currentItems, product.id])];
      localStorage.setItem(storageKey, JSON.stringify(itemsId));
      if (!currentItems.includes(product.id)) {
        toast.success("Item added to your cart.", {
          toastId: "cart-item-added",
        });
      }
      return itemsId;
    } catch {
      toast.error("Could not save this item to your cart.");
      return rejectWithValue({ message: "Could not save this item to your cart." });
    }
  },
  {
    condition: (product, { getState }) => {
      const { shop } = getState();
      return (
        !shop.cartError &&
        shop.addingProductId === null &&
        !shop.cartItems.includes(product.id)
      );
    },
  },
);

export const removeFromCart = createAsyncThunk(
  "shop/removeFromCart",
  async (productId, { rejectWithValue }) => {
    const userId = getUserId();
    if (!userId) {
      return rejectWithValue("Please log in to edit your cart.");
    }

    try {
      const itemsId = JSON.parse(
        localStorage.getItem(`cart_items_${userId}`) ?? "[]",
      ).filter((id) => id !== productId);
      if (itemsId.length === 0) {
        localStorage.removeItem(`cart_items_${userId}`);
      } else {
        localStorage.setItem(`cart_items_${userId}`, JSON.stringify(itemsId));
      }
      return itemsId;
    } catch {
      toast.error("Could not remove this item from your cart.");
      return rejectWithValue("Could not remove this item from your cart.");
    }
  },
);

export const toggleWishlist = createAsyncThunk(
  "shop/toggleWishlist",
  async (productId, { getState, dispatch, rejectWithValue }) => {
    const { wishlistIds } = getState().shop;
    const nextIds = wishlistIds.includes(productId)
      ? wishlistIds.filter((id) => id !== productId)
      : [...wishlistIds, productId];

    try {
      localStorage.setItem("wishlist_ids", JSON.stringify(nextIds));
      dispatch(wishlistUpdated(nextIds));
      return nextIds;
    } catch {
      toast.error("Could not save your wishlist.");
      return rejectWithValue("Could not save your wishlist.");
    }
  },
);

const shopSlice = createSlice({
  name: "shop",
  initialState: {
    allProducts: [],
    searchItem: "",
    loading: true,
    error: "",
    wishlistIds: readWishlistIds(),
    cartItems: [],
    cartError: false,
    cartLoaded: false,
    addingProductId: null,
  },
  reducers: {
    setSearchItem: (state, action) => {
      state.searchItem = action.payload;
    },
    wishlistUpdated: (state, action) => {
      state.wishlistIds = action.payload;
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.cartLoaded = false;
      state.cartError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.allProducts = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.payload ?? "Products could not be loaded.";
        state.loading = false;
      })
      .addCase(loadCart.fulfilled, (state, action) => {
        state.cartItems = action.payload;
        state.cartError = false;
        state.cartLoaded = true;
      })
      .addCase(loadCart.rejected, (state) => {
        state.cartError = true;
      })
      .addCase(addToCart.pending, (state, action) => {
        state.addingProductId = action.meta.arg.id;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cartItems = action.payload;
        state.cartError = false;
        state.cartLoaded = true;
        state.addingProductId = null;
      })
      .addCase(addToCart.rejected, (state) => {
        state.addingProductId = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cartItems = action.payload;
        state.cartLoaded = true;
        state.cartError = false;
      })
      .addCase(removeFromCart.rejected, (state) => {
        state.cartError = true;
      });
  },
});

export const { clearCart, setSearchItem, wishlistUpdated } = shopSlice.actions;

export const selectVisibleProducts = createSelector(
  [(state) => state.shop.allProducts, (state) => state.shop.searchItem],
  (allProducts, searchItem) => {
    const query = searchItem.trim().toLowerCase();
    return query
      ? allProducts.filter((product) =>
          product.title.toLowerCase().includes(query),
        )
      : allProducts;
  },
);

export default shopSlice.reducer;
