import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/api";
import toast from 'react-hot-toast';
import { redirect } from "react-router-dom";

// Login API
export const login = createAsyncThunk(
    "user/login",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await api.post("/login", { email, password });
            return response.data; // Assuming the server responds with user data or a token
        } catch (error) {
            return rejectWithValue(error.response.data || "An error occurred");
        }
    }
);

// Signup API
export const signup = createAsyncThunk(
    "user/signup",
    async ({ username, email, password }, { rejectWithValue }) => {
        try {
            const response = await api.post("/signup", { username, email, password });
            return response.data; // Assuming the server responds with user data or a success message
        } catch (error) {
            return rejectWithValue(error.response.data || "An error occurred");
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        token: null,
        loading: false,
        error: null,
        isSigned: false,
        assessmentCompleted: false
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                toast.success(action.payload.message);

                localStorage.setItem("user", JSON.stringify(state.user));

                const isAssessmentCompleted = action.payload.user.initial_assessment === "completed";
                state.assessmentCompleted = isAssessmentCompleted;

                // Store as a proper JSON boolean string
                localStorage.setItem("hasCompletedQuestions", JSON.stringify(isAssessmentCompleted));
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(action.payload.error)
            })
            // Signup
            .addCase(signup.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.isSigned = false
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.loading = false;
                state.isSigned = true
                toast.success(action.payload.message)
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false;
                state.isSigned = false
                state.error = action.payload;
                toast.error(action.payload.error)

            });
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
