import { users } from '../data/users.js'
import UserCard from '../components/UserCard.jsx'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

export default function Users() {
  // Search box persists across reloads via the custom hook
  const [query, setQuery] = useLocalStorage('users-search', '')

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(query.toLowerCase()) ||
      u.email.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <section>
      <h1>Users</h1>
      <input
        type="search"
        placeholder="Search by name or email…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search users"
      />
      <div className="user-grid">
        {filtered.map((u) => (
          <UserCard key={u.id} user={u} />
        ))}
        {filtered.length === 0 && <p className="muted">No users match “{query}”.</p>}
      </div>
    </section>
  )
}
