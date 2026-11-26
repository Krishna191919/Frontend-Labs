import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
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
    <section>
      <h1>Unit 1 · Topic 1.2 — UI Frameworks (React)</h1>
      <p>
        A Vite + React 19 SPA with React Router, theme/auth Context, and a
        custom hook. Start with the <Link to="/users">users list</Link>.
      </p>
      <p className="muted">Viewport width: {width}px (resize listener with cleanup)</p>
    </section>
  )
}
