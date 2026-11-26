import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchUsers, fetchUser, createUser } from '../api/users.js'

export const useUsers = () =>
  useQuery({ queryKey: ['users'], queryFn: fetchUsers })

export const useUser = (id) =>
  useQuery({ queryKey: ['users', id], queryFn: () => fetchUser(id), enabled: !!id })

export function useCreateUser() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: createUser,
    onSuccess: (created) => {
      // JSONPlaceholder doesn't persist, so patch the cache; with a real API use invalidateQueries.
      qc.setQueryData(['users'], (old = []) => [...old, created])
      // qc.invalidateQueries({ queryKey: ['users'] })
    },
  })
}
