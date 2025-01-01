const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    products : [],
    isLoading : false
}

const shoppingProductSlice = createSlice({
    name : "shoppingProduct",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        
    }
})