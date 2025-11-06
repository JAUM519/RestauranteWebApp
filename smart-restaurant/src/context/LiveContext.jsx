import { createContext, useContext, useMemo } from 'react'
import useRtdbValue from '../hooks/useRtdbValue'

const LiveContext = createContext(null)

export function LiveProvider({ children }) {
    // /.info/connected devuelve true/false
    const connected = !!useRtdbValue('/.info/connected', { initial: false })
    const value = useMemo(() => ({ connected }), [connected])
    return <LiveContext.Provider value={value}>{children}</LiveContext.Provider>
}

export function useLive() {
    const ctx = useContext(LiveContext)
    if (!ctx) throw new Error('useLive debe usarse dentro de <LiveProvider>')
    return ctx
}
