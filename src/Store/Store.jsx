import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Store/userSlice";
import questionsReducer from "../Store/questionsSlice";
import coursesReducer from "../Store/coursesSlice";
import ebooksReducer from "../Store/ebooksSlice";
import dataReducer from "../Store/dataSlice";
import themeReducer from "../Store/themeSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        questions: questionsReducer,
        courses: coursesReducer,
        ebooks: ebooksReducer,
        data: dataReducer,
        theme: themeReducer
    },
});

export default store;
