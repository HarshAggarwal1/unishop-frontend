import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
    name: "login",
    initialState: {
        isLoggedIn: false,
    },
    reducers: {
        updateLoginStatus: (state, action) => {
            state.isLoggedIn = action.payload;
        },
    },
});

export const { updateLoginStatus } = loginSlice.actions;
export default loginSlice.reducer;