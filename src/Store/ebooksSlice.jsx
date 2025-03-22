import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/api";

// Fetch Books API
export const fetchBooks = createAsyncThunk(
    "ebooks/fetchBooks",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(`https://lms-be-sqpa.onrender.com/api/ebooks`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "An error occurred");
        }
    }
);

const ebooksSlice = createSlice({
    name: "ebooks",
    initialState: {
        ebooks: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.loading = false;
                state.ebooks = action.payload;  // Store fetched ebooks in state
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default ebooksSlice.reducer;
