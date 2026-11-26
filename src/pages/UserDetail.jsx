import { useParams, Link } from 'react-router-dom'
import { getUserById } from '../data/users.js'
import { Card } from '../components/ui/Card.jsx'

export default function UserDetail() {
  const { id } = useParams()
  const user = getUserById(id)

  if (!user) {
    return (
      <section>
        <h1 className="text-2xl font-bold">User not found</h1>
        <p className="mt-2 text-muted">No user with id {id}.</p>
        <Link
          to="/users"
          className="mt-4 inline-block text-primary underline focus-visible:outline-2 focus-visible:outline-primary"
        >
          ← Back to users
        </Link>
      </section>
    )
  }

  return (
    <section>
      <Card className="max-w-lg">
        <div className="flex items-center gap-4">
          <img src={user.avatar} alt="" className="h-24 w-24 rounded-full" />
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-muted">{user.email}</p>
            <span className="mt-1 inline-block rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-primary">
              {user.role}
            </span>
          </div>
        </div>
        <p className="mt-4">{user.bio}</p>
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
