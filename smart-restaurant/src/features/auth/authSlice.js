import { createSlice } from '@reduxjs/toolkit'
import { loadAuth, saveAuth, clearAuth } from './storage'

/**
 *  Estado inicial: se carga desde almacenamiento persistente (SessionStorage o LocalStorage)
 */
const initial = loadAuth() || {
  uid: null,
  displayName: null,
  email: null,
  role: null,       // 'client' | 'waiter' | 'cook'
  table: null,      // número de mesa para clientes/anon
  provider: null,   // 'google' | 'anonymous'
  status: 'idle',   // 'idle' | 'authenticated'
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initial,
  reducers: {
    
    loginSucceeded: (state, { payload }) => {
      state.uid = payload.uid
      state.displayName = payload.displayName ?? null
      state.email = payload.email ?? null
      state.role = payload.role ?? null
      state.table = payload.table ?? null
      state.provider = payload.provider ?? null
      state.status = 'authenticated'
      saveAuth(state)
    },

    logout: (state) => {
      state.uid = null
      state.displayName = null
      state.email = null
      state.role = null
      state.table = null
      state.provider = null
      state.status = 'idle'
      clearAuth()
    },
  },
})

export const { loginSucceeded, logout } = authSlice.actions

export const selectAuth = (s) => s.auth
export const selectIsAuthenticated = (s) => s.auth.status === 'authenticated'
export const selectRole = (s) => s.auth.role
export const selectUid = (s) => s.auth.uid
export const selectDisplayName = (s) => s.auth.displayName
export const selectTable = (s) => s.auth.table
export const selectProvider = (s) => s.auth.provider
export const selectEmail = (s) => s.auth.email

export default authSlice.reducer
