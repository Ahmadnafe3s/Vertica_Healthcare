import { configureStore } from '@reduxjs/toolkit';
import asideReducer from './features/aside/asideSlice'


export const store = configureStore({
    reducer: {
        asideReducer
    },
});



export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;