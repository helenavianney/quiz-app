import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ScoreState {
    score: number;
    showResult: boolean;
    quizId: string | null;
    userId: string | null;
}

export const scoreSlice = createSlice({
    name: 'score',
    initialState: {
        score: 0,
        showResult: false,
        quizId: null,
        userId: null
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
        setQuizId: (state, action: PayloadAction<string>) => {
            state.quizId = action.payload;
        },
        setUserId: (state, action: PayloadAction<string>) => {
            state.userId = action.payload;
        },
        saveResult: () => {
            // This will trigger the API call in component
        },
    },
});

export const { incrementScore, resetScore, setShowResult, setQuizId, setUserId, saveResult } = scoreSlice.actions;
export default scoreSlice.reducer;