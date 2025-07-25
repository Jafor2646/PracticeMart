import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
    isLoading: false,
    productList: []
}


export const addNewProduct = createAsyncThunk('/products/addNewProduct', async (formData) => {
    const result = await axios.post(`${VITE_REACT_APP_BACKEND_BASEURL}/api/admin/products/add`, formData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return result?.data;

})


export const fetchAllProducts = createAsyncThunk('/products/fetchAllProducts', async () => {
    const result = await axios.get(`${VITE_REACT_APP_BACKEND_BASEURL}/api/admin/products/get`);
    return result?.data;

})

export const editProduct = createAsyncThunk('/products/editProduct', async ({id, formData}) => {
    const result = await axios.put(`${VITE_REACT_APP_BACKEND_BASEURL}/api/admin/products/edit/${id}`, formData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return result?.data;

})

export const deleteProduct = createAsyncThunk('/products/deleteProduct', async (id) => {
    const result = await axios.delete(`${VITE_REACT_APP_BACKEND_BASEURL}/api/admin/products/delete/${id}`);
    return result?.data;

})
const adminProductsSlice = createSlice({
    name: 'adminProduct',
    initialState,
    reducers :  {},
    extraReducers: (builder) => {   
        builder.addCase(fetchAllProducts.pending, (state) => {
            state.isLoading = true;
        }).addCase(fetchAllProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.productList = action.payload.data;
        }).addCase(fetchAllProducts.rejected, (state) => {
            state.isLoading = false;
            state.productList = [];
        })
    },
})

export default adminProductsSlice.reducer;