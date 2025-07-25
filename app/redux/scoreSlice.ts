import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ScoreState {
    score: number;
    showResult: boolean;
}

export const scoreSlice = createSlice({
    name: 'score',
    initialState: {
        score: 0,
        showResult: false
    } as ScoreState,
    reducers: {
        incrementScore: (state) => {
            state.score += 1;
        },
        resetScore: (state) => {
            state.score = 0;
        },
        setShowResult: (state, action: PayloadAction<boolean>) => {
            state.showResult = action.payload;
        },
    },
});

export const { incrementScore, resetScore, setShowResult } = scoreSlice.actions;
export default scoreSlice.reducer;