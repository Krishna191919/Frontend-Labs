import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

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
      <h1>Login</h1>
      <p className="muted">Stub auth — any email works. Wired to users-api in Unit 2.</p>
      <form onSubmit={onSubmit} className="stack">
        <label>
          Email
          <input
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </section>
  )
}
