import { useMutation } from '@tanstack/react-query'
import { signUp } from '../../services/apiAuth'
import { UserAuth } from '../../types/auth.type'
import toast from 'react-hot-toast'

export function useSignUp() {
  const { mutate: signUpMutate, isLoading } = useMutation({
    mutationFn: ({ fullName, email, password }: UserAuth) => signUp({ fullName, email, password }),
    onSuccess: () => {
      toast.success(
        "Account successfully created!\n Please verify the new account from the user's email address."
      )
    }
  })

  return { signUpMutate, isLoading }
}
