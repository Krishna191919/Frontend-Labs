import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function ProtectedRoute({ children }) {
  const { user } = useAuth()
  const location = useLocation()

  if (!user) {
    // `replace` keeps the attempted URL out of history so Back doesn't loop
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  return children
}
