import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  // Stub: no real backend yet — TODO Unit 2: POST /auth/login against users-api
  const login = async (email) =>
    setUser({ id: 1, name: email.split('@')[0], email })

  const logout = () => setUser(null)

  // React 19: <AuthContext value={...}> works directly — no .Provider needed
  return <AuthContext value={{ user, login, logout }}>{children}</AuthContext>
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
