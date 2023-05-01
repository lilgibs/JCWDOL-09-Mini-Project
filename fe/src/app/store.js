import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/user/userSlice";
import cartSlice from "../features/cart/cartSlice";

export default configureStore({
    reducer:{
        user: userSlice,
        cart: cartSlice
    }
})