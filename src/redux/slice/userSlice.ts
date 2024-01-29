// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem('user')) || null;

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginUser: (state, action) => {
            return action.payload;
        },
        logoutUser: (state) => {
            localStorage.removeItem('user'); // Удаляем пользователя из localStorage при выходе
            return null;
        },
    },
});

export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
