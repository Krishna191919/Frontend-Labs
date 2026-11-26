import { useAuth } from '../context/AuthContext.jsx'
import { Button } from '../components/ui/Button.jsx'
import { Card } from '../components/ui/Card.jsx'

export default function Profile() {
  const { user, logout } = useAuth()

  return (
    <section>
      <h1 className="text-2xl font-bold">Profile</h1>
      <Card className="mt-4 max-w-md">
        <p>
          Welcome, <strong className="text-primary">{user.name}</strong> (
          {user.email})
        </p>
        <p className="mt-2 text-sm text-muted">
          This page is guarded by <code className="text-primary">&lt;ProtectedRoute&gt;</code>{' '}
          — logged-out visitors are redirected to /login.
        </p>
        <Button variant="ghost" className="mt-4" onClick={logout}>
          Logout
        </Button>
      </Card>
    </section>
  )
}
