import { Link } from 'react-router-dom'
import { Card } from './ui/Card.jsx'

function initials(name) {
  return name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export default function UserCard({ user, list = false }) {
  return (
    <Card className={list ? 'flex items-center gap-4' : 'flex gap-4'}>
      <span
        aria-hidden="true"
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary"
      >
        {initials(user.name)}
      </span>
      <div className={list ? 'min-w-0 flex-1' : ''}>
        <h3 className="font-semibold">
          <Link
            to={`/users/${user.id}`}
            className="text-primary hover:underline focus-visible:outline-2 focus-visible:outline-primary"
          >
            {user.name}
          </Link>
        </h3>
        <p className="truncate text-sm text-muted">{user.email}</p>
        <span className="mt-1 inline-block rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
          @{user.username}
        </span>
        {list && user.company && (
          <span className="ml-2 text-xs text-muted">· {user.company.name}</span>
        )}
      </div>
    </Card>
  )
}
