import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Answer {
    id: string;
    question_id: string;
    text: string;
    is_correct: boolean;
}

interface AnswerState {
    answers: Answer[];
    selectedAnswerId: string | null;
}

export const answerSlice = createSlice({
    name: 'answers',
    initialState: {
        answers: [],
        selectedAnswerId: null
    } as AnswerState,
    reducers: {
        setAnswers: (state, action: PayloadAction<Answer[]>) => {
            state.answers = action.payload;
        },
        setSelectedAnswerId: (state, action: PayloadAction<string | null>) => {
            state.selectedAnswerId = action.payload;
        },
    },
});

export const { setAnswers, setSelectedAnswerId } = answerSlice.actions;
export default answerSlice.reducer;