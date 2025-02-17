import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/api";
import toast from 'react-hot-toast';

// Fetch Questions API
export const finishAssessment = createAsyncThunk(
    "questions/finishAssessment",
    async ({ userId }, { rejectWithValue }) => {
        try {
            const response = await api.get(`https://lms-be-do05.onrender.com/api/user-initial-assessment-details`, {
                params: {
                    user_id: userId,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "An error occurred");
        }
    }
);
// Fetch Questions API
export const fetchQuestions = createAsyncThunk(
    "questions/fetchQuestions",
    async ({ tabId, userId }, { rejectWithValue }) => {
        try {
            const response = await api.post(`https://lms-be-do05.onrender.com/api/initial_assessment_questions`, {
                tab_id: tabId,
                user_id: userId,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "An error occurred");
        }
    }
);
// answer Questions API
export const answerQuestion = createAsyncThunk(
    "questions/answerQuestion",
    async ({ user_id, question_id, selected_option_id, tab_id }, { rejectWithValue }) => {
        try {
            const response = await api.post(`https://lms-be-do05.onrender.com/api/initial_assessment_response`, {
                user_id,
                question_id,
                selected_option_id,
                tab_id
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "An error occurred");
        }
    }
);


const questionsSlice = createSlice({
    name: "questions",
    initialState: {
        questions: [],
        tabName: "",
        loading: false,
        error: null,
        allSuccess: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // finishAssessment 
            .addCase(finishAssessment.pending, (state) => {
                state.allSuccess = true;
                state.error = null;
            })
            .addCase(finishAssessment.fulfilled, (state, action) => {
                toast.success("Let's begin")
                localStorage.setItem("hasCompletedQuestions", true);
                state.allSuccess = false;
            })
            .addCase(finishAssessment.rejected, (state, action) => {
                state.allSuccess = false;
                state.error = action.payload;
            });
        builder
            // Fetch Questions
            .addCase(fetchQuestions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchQuestions.fulfilled, (state, action) => {
                state.loading = false;
                state.questions = action.payload.questions || [];
                state.tabName = action.payload.tab_name || "";
            })
            .addCase(fetchQuestions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
        builder
            // answer Questions
            .addCase(answerQuestion.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(answerQuestion.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(answerQuestion.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default questionsSlice.reducer;
