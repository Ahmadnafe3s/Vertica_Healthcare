import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import asideReducer from './features/aside/asideSlice'
import authReducer from './features/auth/authSlice'


const persitConfig = {
    key: 'root',
    version: 1,
    storage
    // dont have to use white list
}


const persistedAuthReducer = persistReducer(persitConfig, authReducer)


export const store = configureStore({
    reducer: {
        asideReducer,
        auth: persistedAuthReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
            },
        }),
});


export const persistor = persistStore(store)


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;