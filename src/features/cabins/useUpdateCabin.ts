import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { updateCabin } from '../../services/apiCabins'
import CabinType from '../../types/cabin.type'

export default function useUpdateCabin() {
  const queryClient = useQueryClient()

  const { mutate: updateCabinMutate, isLoading: isUpdating } = useMutation({
    mutationFn: ({ currCabin, id }: { currCabin: CabinType; id: string }) =>
      updateCabin(currCabin, id),
    onSuccess: () => {
      toast.success('Cabin successfully updated')
      queryClient.invalidateQueries({ queryKey: ['cabins'] })
    },
    onError: (error) => {
      toast.error((error as Error).message)
    }
  })

  return { updateCabinMutate, isUpdating }
}
