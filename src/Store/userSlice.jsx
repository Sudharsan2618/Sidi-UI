import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/api";
import toast from 'react-hot-toast';

// Helper function to save auth data
const saveAuthData = (user, token) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
};

// Helper function to clear auth data
const clearAuthData = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
};

// Login API
export const login = createAsyncThunk(
    "user/login",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await api.post("/login", { email, password });
            if (response.data.token) {
                api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
            }
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "An error occurred");
        }
    }
);

// Signup API
export const signup = createAsyncThunk(
    "user/signup",
    async ({ username, email, password }, { rejectWithValue }) => {
        try {
            const response = await api.post("/signup", { username, email, password });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "An error occurred");
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: JSON.parse(localStorage.getItem("user")) || null,
        token: localStorage.getItem("token") || null,
        loading: false,
        error: null,
        isSigned: false
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            clearAuthData();
            delete api.defaults.headers.common['Authorization'];
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

                // Save auth data
                saveAuthData(action.payload.user, action.payload.token);
                toast.success(action.payload.message);
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
                state.isSigned = false;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.loading = false;
                state.isSigned = true;
                toast.success(action.payload.message);
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false;
                state.isSigned = false;
                state.error = action.payload;
                toast.error(action.payload.error);
            });
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
