import { createSlice } from '@reduxjs/toolkit'
import { loadAuth, saveAuth, clearAuth } from './storage'

const initial = loadAuth() || {
    uid: null,
    displayName: null,
    role: null,       // 'client' | 'waiter' | 'cook'
    status: 'idle',   // 'idle' | 'authenticated'
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initial,
    reducers: {
        loginSucceeded: (state, { payload }) => {
            state.uid = payload.uid
            state.displayName = payload.displayName
            state.role = payload.role
            state.status = 'authenticated'
            saveAuth(state)
        },
        logout: (state) => {
            state.uid = null
            state.displayName = null
            state.role = null
            state.status = 'idle'
            clearAuth()
        },
    },
})

export const { loginSucceeded, logout } = authSlice.actions

// Selectores
export const selectAuth = (s) => s.auth
export const selectIsAuthenticated = (s) => s.auth.status === 'authenticated'
export const selectRole = (s) => s.auth.role
export const selectUid = (s) => s.auth.uid
export const selectDisplayName = (s) => s.auth.displayName

export default authSlice.reducer
