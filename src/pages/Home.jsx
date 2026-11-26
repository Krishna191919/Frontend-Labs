import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card } from '../components/ui/Card.jsx'
import { Button } from '../components/ui/Button.jsx'

const features = [
  {
    title: 'React 19 + Router',
    body: 'Component tree, nested routes, useParams and guarded pages with ProtectedRoute.',
  },
  {
    title: 'Context + hooks',
    body: 'Theme and Auth broadcast via context; useLocalStorage keeps state across reloads.',
  },
  {
    title: 'Design tokens',
    body: 'CSS variables recolour the whole UI — one token change updates light and dark mode.',
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
            Unit 1 · Topic 1.3 — Styling Systems
          </h1>
          <p className="mt-2 text-muted">
            Tailwind CSS v4, responsive Grid + Flexbox, and CSS-variable design
            tokens. Start with the{' '}
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
