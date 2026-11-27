import { useParams, Link } from 'react-router-dom'
import { useUser } from '../hooks/useUsers.js'
import { Card } from '../components/ui/Card.jsx'
import { Button } from '../components/ui/Button.jsx'

function initials(name = '') {
  return name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export default function UserDetail() {
  const { id } = useParams()
  const { data: user, isPending, isError, error, refetch } = useUser(id)

  if (isPending) return <p role="status">Loading user…</p>

  if (isError)
    return (
      <p role="alert" className="text-primary">
        Failed: {error.message}{' '}
        <Button variant="ghost" onClick={refetch}>
          Retry
        </Button>
      </p>
    )

  return (
    <section>
      <Card className="max-w-lg">
        <div className="flex items-center gap-4">
          <span
            aria-hidden="true"
            className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-primary/10 text-2xl font-semibold text-primary"
          >
            {initials(user.name)}
          </span>
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-muted">{user.email}</p>
            <span className="mt-1 inline-block rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              @{user.username}
            </span>
          </div>
        </div>
        <dl className="mt-4 space-y-1 text-sm">
          <div className="flex gap-2">
            <dt className="text-muted">Company:</dt>
            <dd>{user.company?.name}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-muted">City:</dt>
            <dd>{user.address?.city}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-muted">Phone:</dt>
            <dd>{user.phone}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-muted">Website:</dt>
            <dd>{user.website}</dd>
          </div>
        </dl>
        <Link
          to="/users"
          className="mt-4 inline-block text-primary underline focus-visible:outline-2 focus-visible:outline-primary"
        >
          ← Back to users
        </Link>
      </Card>
    </section>
  )
}
