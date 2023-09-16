import { useQuery } from '@tanstack/react-query'
import { getCurrentUser } from '../../services/apiAuth'
import { User } from '@supabase/supabase-js'

export function useUser() {
  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser
  })
  return { user, isLoading, isAuthenticated: (user as User)?.role === 'authenticated' }
}
