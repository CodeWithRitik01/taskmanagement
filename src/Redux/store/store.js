import { configureStore } from "@reduxjs/toolkit";
import { mainReducer } from "../reducers/mainReducers";

export const store = configureStore({
    reducer:{
        mainReducer
    }
})