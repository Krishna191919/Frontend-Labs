import { lazy, Suspense, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card } from '../components/ui/Card.jsx'
import { Button } from '../components/ui/Button.jsx'

// Component-based splitting: loaded only when the button is clicked
const StatsPanel = lazy(() => import('../components/StatsPanel.jsx'))

const features = [
  {
    title: 'Route-based splitting',
    body: 'Every page is React.lazy — its chunk downloads on navigation, not on first paint.',
  },
  {
    title: 'Vendor chunks',
    body: 'react, react-dom and the router sit in a long-lived chunk that rarely changes.',
  },
  {
    title: 'Bundle analysis',
    body: 'rollup-plugin-visualizer emits dist/stats.html so every kilobyte is accounted for.',
  },
]

export default function Home() {
  const navigate = useNavigate()
  const [showStats, setShowStats] = useState(false)

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
            Unit 1 · Topic 1.5 — Build Tools
          </h1>
          <p className="mt-2 text-muted">
            Vite code splitting: lazy routes, manual chunks and bundle analysis.
            Start with the{' '}
            <Link
              to="/users"
              className="text-primary underline focus-visible:outline-2 focus-visible:outline-primary"
            >
              users list
            </Link>{' '}
            and watch its chunk load in the Network panel.
          </p>
          <p className="mt-2 text-sm text-muted">
            Viewport width: {width}px (resize listener with cleanup)
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="ghost" onClick={() => setShowStats(true)}>
            Load stats (lazy modal)
          </Button>
          <Button onClick={() => navigate('/users')}>Browse users →</Button>
        </div>
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

      {showStats && (
        <Suspense
          fallback={
            <p role="status" className="text-muted">
              Loading stats chunk…
            </p>
          }
        >
          <StatsPanel onClose={() => setShowStats(false)} />
        </Suspense>
      )}
    </section>
  )
}
