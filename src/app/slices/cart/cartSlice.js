import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartStatus: "empty",
        totalItems: 0,
    },
    reducers: {
        updateCartStatus: (state, action) => {
            state.cartStatus = action.payload;
            state.totalItems = action.payload === "filled" ? 5 : 0;   
        },
    },
});

export const { updateCartStatus } = cartSlice.actions;
export default cartSlice.reducer;