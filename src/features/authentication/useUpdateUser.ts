import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateCurrentUser } from '../../services/apiAuth'
import { UserAuth } from '../../types/auth.type'
import toast from 'react-hot-toast'

export function useUpdateUser() {
  const queryClient = useQueryClient()

  const { mutate: updateUserMutate, isLoading: isUpdating } = useMutation({
    mutationFn: ({ password, fullName, avatar }: Partial<UserAuth>) =>
      updateCurrentUser({ password, fullName, avatar }),
    onSuccess: () => {
      toast.success('User account updated successfully')
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
    onError: (error) => toast.error((error as Error).message)
  })

  return { updateUserMutate, isUpdating }
}
