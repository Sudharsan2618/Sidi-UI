import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Store/userSlice";
import dataReducer from "../Store/dataSlice";
import themeReducer from "../Store/themeSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        data: dataReducer,
        theme: themeReducer
    },
});

export default store;
