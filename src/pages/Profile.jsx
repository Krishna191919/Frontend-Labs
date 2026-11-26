import { useAuth } from '../context/AuthContext.jsx'

export default function Profile() {
  const { user, logout } = useAuth()

  return (
    <section>
      <h1>Profile</h1>
      <p>
        Welcome, <strong>{user.name}</strong> ({user.email})
      </p>
      <p className="muted">
        This page is guarded by <code>&lt;ProtectedRoute&gt;</code> — logged-out
        visitors are redirected to /login.
      </p>
      <button onClick={logout}>Logout</button>
    </section>
  )
}
