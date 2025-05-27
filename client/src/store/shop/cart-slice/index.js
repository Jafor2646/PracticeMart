import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    cartItems: [],
    isLoading: false
}


export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ userId, productId, quantity }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:5000/api/shop/cart/add", {
        userId,
        productId,
        quantity,
      });

      // ✅ Trigger a fresh fetch after adding
      dispatch(fetchCartItems(userId));

      return response.data; // Keep this if your reducer uses it
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCartItems = createAsyncThunk('cart/fetchCartItems', async (userId) => {
    const response = await axios.get(`http://localhost:5000/api/shop/cart/get/${userId}`);


    return response.data;

}
);


export const deleteCartItem = createAsyncThunk(
  'cart/deleteCartItem',
  async ({ userId, productId }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/shop/cart/${userId}/${productId}`);

      dispatch(fetchCartItems(userId)); // 🔁 Re-fetch cart after deletion

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



export const updateCartQuantity = createAsyncThunk(
  'cart/updateCartQuantity',
  async ({ userId, productId, quantity }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.put("http://localhost:5000/api/shop/cart/update-cart", {
        userId,
        productId,
        quantity,
      });

      dispatch(fetchCartItems(userId)); // 🔁 Re-fetch cart after update

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);




const shoppingCartSlice = createSlice({
    name: 'shoppingCart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addToCart.pending, (state)=>{
            state.isLoading = true;
        }).addCase(addToCart.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.cartItems = action.payload.data;
        }).addCase(addToCart.rejected, (state)=>{
            state.isLoading = false;
            state.cartItems = [];
        }).addCase(fetchCartItems.pending, (state)=>{
            state.isLoading = true;
        }).addCase(fetchCartItems.fulfilled, (state, action)=>{
            
            state.isLoading = false;
            state.cartItems = action.payload.data;
        }).addCase(fetchCartItems.rejected, (state)=>{
            state.isLoading = false;
            state.cartItems = [];
        }).addCase(updateCartQuantity.pending, (state)=>{
            state.isLoading = true;
        }).addCase(updateCartQuantity.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.cartItems = action.payload.data;
        }).addCase(updateCartQuantity.rejected, (state)=>{
            state.isLoading = false;
            state.cartItems = [];
        }).addCase(deleteCartItem.pending, (state)=>{
            state.isLoading = true;
        }).addCase(deleteCartItem.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.cartItems = action.payload.data;
        }).addCase(deleteCartItem.rejected, (state)=>{
            state.isLoading = false;
            state.cartItems = [];
        });
    },
});

export default shoppingCartSlice.reducer;