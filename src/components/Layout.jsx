import { NavLink, Outlet } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { Button } from './ui/Button.jsx'

const linkClass = ({ isActive }) =>
  `focus-visible:outline-2 focus-visible:outline-primary ${isActive ? 'text-primary font-semibold' : 'text-muted hover:text-fg'}`

export default function Layout() {
  const { theme, toggle } = useTheme()
  const { user, logout } = useAuth()

  return (
    <>
      {/* Navbar: Flexbox — one axis, wraps on small screens */}
      <header className="border-b border-line bg-surface">
        <nav className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 p-4">
          <NavLink to="/" className="mr-auto text-lg font-semibold text-fg focus-visible:outline-2 focus-visible:outline-primary">
            frontend-lab
          </NavLink>
          <NavLink to="/" className={linkClass} end>
            Home
          </NavLink>
          <NavLink to="/users" className={linkClass}>
            Users
          </NavLink>
          {user ? (
            <>
              <NavLink to="/profile" className={linkClass}>
                Profile
              </NavLink>
              <Button variant="ghost" onClick={logout}>
                Logout ({user.name})
              </Button>
            </>
          ) : (
            <NavLink to="/login" className={linkClass}>
              Login
            </NavLink>
          )}
          <Button
            variant="ghost"
            onClick={toggle}
            aria-label="Toggle theme"
            className="px-3"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </Button>
        </nav>
      </header>
      <main className="mx-auto max-w-6xl p-4 md:p-8">
        <Outlet />
      </main>
    </>
  )
}
