import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section>
      <h1 className="text-3xl font-bold">404</h1>
      <p className="mt-2 text-muted">That page doesn’t exist.</p>
      <Link
        to="/"
        className="mt-4 inline-block text-primary underline focus-visible:outline-2 focus-visible:outline-primary"
      >
        Go home
      </Link>
    </section>
  )
}
