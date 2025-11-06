import { configureStore } from '@reduxjs/toolkit'
// Reducers se agregarán progresivamente
export const store = configureStore({
    reducer: {
        // auth: authReducer, // se añadira en el siguiente commit
    },
    middleware: (getDefault) => getDefault(),
    devTools: true,
})
