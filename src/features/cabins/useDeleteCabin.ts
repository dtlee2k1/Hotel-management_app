import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteCabin } from '../../services/apiCabins'
import { toast } from 'react-hot-toast'

export default function useDeleteCabin() {
  const queryClient = useQueryClient()

  const { isLoading: isDeleting, mutate: deleteCabinMutate } = useMutation({
    mutationFn: deleteCabin, //(id: string) => deleteCabin(id)
    onSuccess: () => {
      toast.success('Cabin successfully deleted')
      queryClient.invalidateQueries({ queryKey: ['cabins'] })
    },
    onError: (error) => {
      toast.error((error as Error).message)
    }
  })

  return { isDeleting, deleteCabinMutate }
}
