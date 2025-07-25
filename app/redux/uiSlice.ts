import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
    isLoading: boolean;
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isLoading: true
    } as UIState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
});

export const { setLoading } = uiSlice.actions;
export default uiSlice.reducer;