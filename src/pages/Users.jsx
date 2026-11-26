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
      <h1 className="text-2xl font-bold">Users</h1>
      <input
        type="search"
        placeholder="Search by name or email…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search users"
        className="mt-4 w-full max-w-md rounded-card border border-line bg-surface px-4 py-2 text-fg placeholder:text-muted focus-visible:outline-2 focus-visible:outline-primary"
      />
      {/* Card gallery: Grid — two axes, columns decide size */}
      <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((u) => (
          <li key={u.id}>
            <UserCard user={u} />
          </li>
        ))}
      </ul>
      {filtered.length === 0 && (
        <p className="mt-4 text-muted">No users match “{query}”.</p>
      )}
    </section>
  )
}
