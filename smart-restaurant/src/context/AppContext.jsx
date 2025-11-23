import React from "react";
import { createContext, useContext, useMemo, useState } from 'react'

export const AppContext = createContext(null)

export function AppProvider({ children }) {
    const [user, setUser] = useState(null) // { uid, displayName, role: 'client'|'waiter'|'cook' }
    const [theme, setTheme] = useState('light')

    const value = useMemo(() => ({
        user, setUser,
        theme, setTheme,
    }), [user, theme])

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext() {
    const ctx = useContext(AppContext)
    if (!ctx) throw new Error('useAppContext debe usarse dentro de <AppProvider>')
    return ctx
}
