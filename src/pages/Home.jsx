import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card } from '../components/ui/Card.jsx'
import { Button } from '../components/ui/Button.jsx'

const features = [
  {
    title: 'Server state — TanStack Query',
    body: 'Users come from a REST API: cached, deduped, retried, with background refetch — loading and error states included.',
  },
  {
    title: 'Client state — Zustand',
    body: 'UI choices (grid/list view, search) live in a tiny store; query results are never copied into it.',
  },
  {
    title: 'Mutations + cache updates',
    body: 'Adding a user writes straight into the cached ["users"] list — the UI updates without a refetch.',
  },
]

export default function Home() {
  const navigate = useNavigate()

  // Effect with cleanup: subscribe on mount, unsubscribe on unmount.
  // Under StrictMode (dev) this runs twice — mount, cleanup, mount again —
  // which proves the cleanup actually detaches the listener (no leaks).
  const [width, setWidth] = useState(() => window.innerWidth)

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <section className="space-y-8">
      {/* Hero: flex — stacked on mobile, side-by-side from md: */}
      <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold leading-tight">
            Unit 1 · Topic 1.4 — State Management
          </h1>
          <p className="mt-2 text-muted">
            TanStack Query for server state, Zustand for UI state, and cache
            updates after mutations. Start with the{' '}
            <Link
              to="/users"
              className="text-primary underline focus-visible:outline-2 focus-visible:outline-primary"
            >
              users list
            </Link>
            .
          </p>
          <p className="mt-2 text-sm text-muted">
            Viewport width: {width}px (resize listener with cleanup)
          </p>
        </div>
        <Button onClick={() => navigate('/users')}>Browse users →</Button>
      </div>

      {/* Feature grid: layout decides size */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-4">
        {features.map((f) => (
          <Card key={f.title}>
            <h2 className="font-semibold text-primary">{f.title}</h2>
            <p className="mt-2 text-sm text-muted">{f.body}</p>
          </Card>
        ))}
      </div>
    </section>
  )
}
