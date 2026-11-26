import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { Button } from '../components/ui/Button.jsx'
import { Card } from '../components/ui/Card.jsx'

export default function Login() {
  const [email, setEmail] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from ?? '/profile'

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!email.trim()) return
    await login(email.trim())
    navigate(from, { replace: true })
  }

  return (
    <section>
      <h1 className="text-2xl font-bold">Login</h1>
      <p className="mt-1 text-muted">
        Stub auth — any email works. Wired to users-api in Unit 2.
      </p>
      <Card className="mt-4 max-w-md">
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1 text-sm font-medium">
            Email
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-card border border-line bg-bg px-3 py-2 text-fg placeholder:text-muted focus-visible:outline-2 focus-visible:outline-primary"
            />
          </label>
          <Button type="submit">Login</Button>
        </form>
      </Card>
    </section>
  )
}
