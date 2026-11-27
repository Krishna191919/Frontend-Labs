import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

// Route-based code splitting: one chunk per page, loaded on demand
const Home = lazy(() => import('./pages/Home.jsx'))
const Users = lazy(() => import('./pages/Users.jsx'))
const UserDetail = lazy(() => import('./pages/UserDetail.jsx'))
const Login = lazy(() => import('./pages/Login.jsx'))
const Profile = lazy(() => import('./pages/Profile.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

function PageSpinner() {
  return (
    <p role="status" className="p-8 text-muted">
      Loading…
    </p>
  )
}

export default function App() {
  return (
    <Suspense fallback={<PageSpinner />}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="users" element={<Users />} />
          <Route path="users/:id" element={<UserDetail />} />
          <Route path="login" element={<Login />} />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
