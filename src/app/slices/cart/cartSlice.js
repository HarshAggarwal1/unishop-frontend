import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        totalItems: 0,
        cartItems: [],
        netPrice: 0,
        delieveryCharges: 50,
        discounts: 40,
    },
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existingItem = state.cartItems.find((cartItem) => cartItem.id === item.id);
            if (existingItem) {
                existingItem.quantity += item.quantity;
            } else {
                state.cartItems.push(item);
            }
            state.totalItems += item.quantity;
            state.netPrice += item.price * item.quantity;
        },
        removeFromCart: (state, action) => {
            const itemId = action.payload;
            const existingItem = state.cartItems.find((cartItem) => cartItem.id === itemId);
            if (existingItem) {
                state.totalItems -= existingItem.quantity;
                state.netPrice -= existingItem.price * existingItem.quantity;
                state.cartItems = state.cartItems.filter((cartItem) => cartItem.id !== itemId);
            }
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const existingItem = state.cartItems.find((cartItem) => cartItem.id === id);
            if (existingItem) {
                state.totalItems += quantity - existingItem.quantity;
                state.netPrice += (quantity - existingItem.quantity) * existingItem.price;
                existingItem.quantity = quantity;
            }
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;