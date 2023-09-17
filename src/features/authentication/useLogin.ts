import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { UserAuth } from '../../types/auth.type'
import { login } from '../../services/apiAuth'

export function useLogin() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { mutate: loginMutate, isLoading } = useMutation({
    mutationFn: ({ email, password }: UserAuth) => login({ email, password }),
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data.user)
      toast.success('Login Successfully')
      navigate('/', { replace: true })
    },
    onError: (error) => {
      toast.error((error as Error).message)
    }
  })

  return { loginMutate, isLoading }
}
