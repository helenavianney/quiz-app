import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Quiz {
    id: string;
    title: string;
    description: string;
    user_id: string;
    created_at: string;
}

interface QuizState {
    quizzes: Quiz[];
    quizCompleted: boolean;
}

export const quizSlice = createSlice({
    name: 'quizzes',
    initialState: {
        quizzes: [],
        quizCompleted: false
    } as QuizState,
    reducers: {
        setQuizzes: (state, action: PayloadAction<Quiz[]>) => {
            state.quizzes = action.payload;
        },
        setQuizCompleted: (state, action: PayloadAction<boolean>) => {
            state.quizCompleted = action.payload;
        },
    },
});

export const { setQuizzes, setQuizCompleted } = quizSlice.actions;
export default quizSlice.reducer;