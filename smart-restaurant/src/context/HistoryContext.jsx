import React from "react";
import { createContext, useContext, useMemo, useRef, useState } from 'react'
import Stack from '../data-structures/stack'

const HistoryContext = createContext(null)

export function HistoryProvider({ children, max = 100 }) {
  const stackRef = useRef(new Stack())
  const [version, setVersion] = useState(0)
  const push = (event) => {
    const now = new Date().toISOString()
    stackRef.current.push({ ts: now, ...event })
    if (stackRef.current.size() > max) stackRef.current.toArray().splice(0, stackRef.current.size() - max)
    setVersion((v) => v + 1)
  }
  const clear = () => { stackRef.current.clear(); setVersion((v) => v + 1) }
  const list = stackRef.current.toArray()
  const value = useMemo(() => ({ push, clear, list, version }), [version])
  return <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>
}

export function useHistory() {
  const ctx = useContext(HistoryContext)
  if (!ctx) throw new Error('useHistory debe usarse dentro de <HistoryProvider>')
  return ctx
}

