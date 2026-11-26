import { Link } from 'react-router-dom'

export default function UserCard({ user }) {
  return (
    <article className="user-card">
      <img src={user.avatar} alt="" className="avatar" />
      <div>
        <h3>
          <Link to={`/users/${user.id}`}>{user.name}</Link>
        </h3>
        <p>{user.email}</p>
        <span className={`role role-${user.role}`}>{user.role}</span>
      </div>
    </article>
  )
}
