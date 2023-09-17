import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import { deleteBooking } from '../../services/apiBookings'

export default function useDeleteBooking() {
  const queryClient = useQueryClient()

  const { mutate: deleteBookingMutate, isLoading: isDeleting } = useMutation({
    mutationFn: (bookingId: string) => deleteBooking(bookingId),
    onSuccess: () => {
      toast.success(`Booking successfully deleted`)
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
    },
    onError: (error) => {
      toast.error((error as Error).message)
    }
  })

  return { deleteBookingMutate, isDeleting }
}
