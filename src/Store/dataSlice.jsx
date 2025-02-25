import { createSlice } from '@reduxjs/toolkit';

const dataSlice = createSlice({
    name: 'data',
    initialState: {
        mapColor: '#033ff3',
    },
    reducers: {
        setMapColor: (state, action) => {
            state.mapColor = action.payload;
        },
    },
});

export const { setMapColor } = dataSlice.actions;
export default dataSlice.reducer;
