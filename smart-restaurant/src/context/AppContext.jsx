import { createContext, useContext, useMemo, useState } from "react";

/**
 * Contexto global de la aplicación
 * Maneja información compartida como el usuario actual y el tema visual
 */

export const AppContext = createContext(null);

export function AppProvider({ children }) {
  // Usuario autenticado { uid, displayName, role: 'client' | 'waiter' | 'cook' }
  const [user, setUser] = useState(null);

  // Tema visual global
  const [theme, setTheme] = useState("light");

  /**
   * useMemo optimiza el contexto evitando re-renderizados innecesarios.
   * Solo cambia cuando user o theme cambian.
   */
  const value = useMemo(
    () => ({
      user,
      setUser,
      theme,
      setTheme,
    }),
    [user, theme]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

/**
 * Hook personalizado para consumir el contexto
 * Garantiza que solo se use dentro de <AppProvider>
 */
export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext debe usarse dentro de <AppProvider>");
  return ctx;
}
