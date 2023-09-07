import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { createCabin } from '../../services/apiCabins'

export default function useCreateCabin() {
  const queryClient = useQueryClient()

  const { mutate: createCabinMutate, isLoading: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success('New cabin successfully created')
      queryClient.invalidateQueries({ queryKey: ['cabins'] })
    },
    onError: (error) => {
      toast.error((error as Error).message)
    }
  })

  return { createCabinMutate, isCreating }
}
