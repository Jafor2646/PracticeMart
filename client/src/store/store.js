import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";

import adminProductsSlice from "./admin/products-slice";
import adminOrderSlice from "./admin/order-slice";
import shoppingProductSlice from "./shop/products-slice";
import shoppingCartSlice from "./shop/cart-slice";
import shoppingAddressSlice from "./shop/address-slice";
import shoppingOrderSlice from "./shop/order-slice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        
        adminProducts : adminProductsSlice,
        adminOrder: adminOrderSlice,

        shopProducts : shoppingProductSlice,
        shopCart : shoppingCartSlice,
        shopAddress : shoppingAddressSlice,
        shopOrder: shoppingOrderSlice
    }   
});

export default store;