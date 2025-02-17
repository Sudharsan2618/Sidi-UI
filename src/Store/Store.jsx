import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Store/userSlice";
import questionsReducer from "../Store/questionsSlice";
import coursesReducer from "../Store/coursesSlice";
import ebooksReducer from "../Store/ebooksSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        questions: questionsReducer,
        courses: coursesReducer,
        ebooks: ebooksReducer


    },
});

export default store;
