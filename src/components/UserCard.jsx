import { Link } from 'react-router-dom'
import { Card } from './ui/Card.jsx'

export default function UserCard({ user }) {
  return (
    <Card className="flex gap-4">
      <img src={user.avatar} alt="" className="h-12 w-12 rounded-full" />
      <div>
        <h3 className="font-semibold">
          <Link
            to={`/users/${user.id}`}
            className="text-primary hover:underline focus-visible:outline-2 focus-visible:outline-primary"
          >
            {user.name}
          </Link>
        </h3>
        <p className="text-sm text-muted">{user.email}</p>
        <span className="mt-1 inline-block rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-primary">
          {user.role}
        </span>
      </div>
    </Card>
  )
}
