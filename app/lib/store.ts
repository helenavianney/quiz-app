import { configureStore } from '@reduxjs/toolkit'
import { questionSlice } from '@/app/redux/questionSlice'
import { quizSlice } from '@/app/redux/quizSlice'
import { answerSlice } from '@/app/redux/answerSlice'
import { uiSlice } from '@/app/redux/uiSlice'
import { scoreSlice } from '@/app/redux/scoreSlice'

export const makeStore = () => {
    return configureStore({
        reducer: {
            questions: questionSlice.reducer,
            quizzes: quizSlice.reducer,
            answers: answerSlice.reducer,
            ui: uiSlice.reducer,
            score: scoreSlice.reducer,
        }
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']