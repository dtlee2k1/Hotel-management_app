import { useMutation, useQueryClient } from '@tanstack/react-query'
import { logout } from '../../services/apiAuth'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export function useLogout() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { mutate: logoutMutate, isLoading } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries()
      toast.success('Logout successfully')
      navigate('/login', { replace: true })
    },
    onError: (error) => toast.error((error as Error).message)
  })

  return { logoutMutate, isLoading }
}
