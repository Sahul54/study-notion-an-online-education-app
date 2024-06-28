import { createSlice } from "@reduxjs/toolkit";

const initialSate = {
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialSate,
    reducers: {
        setToken(state, value){
            state.token = value.payload;
        },
    },
});

export const {setToken} = authSlice.actions;
export default authSlice.reducer;