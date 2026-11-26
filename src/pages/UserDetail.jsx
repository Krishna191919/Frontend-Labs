import { useParams, Link } from 'react-router-dom'
import { getUserById } from '../data/users.js'

export default function UserDetail() {
  const { id } = useParams()
  const user = getUserById(id)

  if (!user) {
    return (
      <section>
        <h1>User not found</h1>
        <p className="muted">No user with id {id}.</p>
        <Link to="/users">← Back to users</Link>
      </section>
    )
  }

  return (
    <section>
      <img src={user.avatar} alt="" className="avatar avatar-lg" />
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <span className={`role role-${user.role}`}>{user.role}</span>
      <p>{user.bio}</p>
      <Link to="/users">← Back to users</Link>
    </section>
  )
}
