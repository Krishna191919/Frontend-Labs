import { useState } from 'react'
import { useUsers, useCreateUser } from '../hooks/useUsers.js'
import UserCard from '../components/UserCard.jsx'
import { Button } from '../components/ui/Button.jsx'
import { Card } from '../components/ui/Card.jsx'
import { useUiStore } from '../store/ui.js'

export default function Users() {
  const { data: users, isPending, isError, error, refetch, isFetching } = useUsers()
  const createUser = useCreateUser()

  // UI state (Zustand selectors — only re-render on the slice used)
  const view = useUiStore((s) => s.view)
  const setView = useUiStore((s) => s.setView)
  const search = useUiStore((s) => s.search)
  const setSearch = useUiStore((s) => s.setSearch)

  // Create-user form (client state — local useState is enough)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const onCreate = (e) => {
    e.preventDefault()
    if (!name.trim() || !email.trim()) return
    createUser.mutate(
      { name: name.trim(), email: email.trim(), username: name.trim().split(' ')[0].toLowerCase() },
      {
        onSuccess: () => {
          setName('')
          setEmail('')
        },
      },
    )
  }

  if (isPending) return <p role="status">Loading users…</p>

  if (isError)
    return (
      <p role="alert" className="text-primary">
        Failed: {error.message}{' '}
        <Button variant="ghost" onClick={refetch}>
          Retry
        </Button>
      </p>
    )

  const q = search.trim().toLowerCase()
  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.username.toLowerCase().includes(q),
  )

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-bold">Users</h1>
        {isFetching && <small role="status" className="text-muted">Refreshing…</small>}
        <div className="ml-auto flex gap-2">
          <Button
            variant={view === 'grid' ? 'primary' : 'ghost'}
            onClick={() => setView('grid')}
            aria-pressed={view === 'grid'}
          >
            Grid
          </Button>
          <Button
            variant={view === 'list' ? 'primary' : 'ghost'}
            onClick={() => setView('list')}
            aria-pressed={view === 'list'}
          >
            List
          </Button>
        </div>
      </div>

      <input
        type="search"
        placeholder="Filter users (Zustand search)…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Search users"
        className="w-full max-w-md rounded-card border border-line bg-surface px-4 py-2 text-fg placeholder:text-muted focus-visible:outline-2 focus-visible:outline-primary"
      />

      {/* Add user (mutation) */}
      <Card className="max-w-md">
        <h2 className="font-semibold">Add user</h2>
        <form onSubmit={onCreate} className="mt-2 flex flex-col gap-3">
          <input
            type="text"
            required
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-card border border-line bg-bg px-3 py-2 text-fg placeholder:text-muted focus-visible:outline-2 focus-visible:outline-primary"
          />
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-card border border-line bg-bg px-3 py-2 text-fg placeholder:text-muted focus-visible:outline-2 focus-visible:outline-primary"
          />
          <Button type="submit" disabled={createUser.isPending}>
            {createUser.isPending ? 'Adding…' : 'Add user'}
          </Button>
          {createUser.isError && (
            <p role="alert" className="text-sm text-primary">
              {createUser.error.message}
            </p>
          )}
        </form>
      </Card>

      {filtered.length === 0 ? (
        <p className="text-muted">No users match “{search}”.</p>
      ) : (
        <ul
          className={
            view === 'grid'
              ? 'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'
              : 'grid grid-cols-1 gap-3'
          }
        >
          {filtered.map((u) => (
            <li key={u.id}>
              <UserCard user={u} list={view === 'list'} />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
