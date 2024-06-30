import { createSlice } from "@reduxjs/toolkit";
// import { setLoading } from "./profileSlice";

const initialState = {
    signupData: null,
    loading: false,
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {

        setSignUpData(state, value){
            state.signupData = value.payload;
        },

        setToken(state, value){
            state.token = value.payload;
        },
        setLoading (state, value) {
            state.loading = value.payload;
        },
    },
});

export const {setSignUpData, setToken, setLoading} = authSlice.actions;
export default authSlice.reducer;