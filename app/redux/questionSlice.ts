import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Question {
    id: string;
    quiz_id: string;
    text: string;
}

interface QuestionState {
    questions: Question[];
    currentQuestionIndex: number;
}

export const questionSlice = createSlice({
    name: 'questions',
    initialState: {
        questions: [],
        currentQuestionIndex: 0
    } as QuestionState,
    reducers: {
        setQuestions: (state, action: PayloadAction<Question[]>) => {
            state.questions = action.payload;
        },
        setCurrentQuestionIndex: (state, action: PayloadAction<number>) => {
            state.currentQuestionIndex = action.payload;
        },
        nextQuestion: (state) => {
            state.currentQuestionIndex += 1;
        },
        resetQuestionIndex: (state) => {
            state.currentQuestionIndex = 0;
        },
    },
});

export const { setQuestions, setCurrentQuestionIndex, nextQuestion, resetQuestionIndex } = questionSlice.actions;
export default questionSlice.reducer;