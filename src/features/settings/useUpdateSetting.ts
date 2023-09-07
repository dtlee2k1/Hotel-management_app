import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { updateSetting } from '../../services/apiSettings'

export default function useUpdateSetting() {
  const queryClient = useQueryClient()

  const { mutate: updateSettingMutate, isLoading: isUpdating } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success('Setting successfully updated')
      queryClient.invalidateQueries({ queryKey: ['settings'] })
    },
    onError: (error) => {
      toast.error((error as Error).message)
    }
  })

  return { updateSettingMutate, isUpdating }
}
