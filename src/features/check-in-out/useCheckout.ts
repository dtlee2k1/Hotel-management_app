import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import { updateBooking } from '../../services/apiBookings'
import { BookingType } from '../../types/booking.type'

export default function useCheckout() {
  const queryClient = useQueryClient()

  const { mutate: checkoutMutate, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId: string) =>
      updateBooking(bookingId, {
        status: 'checked-out'
      }),
    onSuccess: (data: BookingType) => {
      toast.success(`Booking data #${data.id} successfully checked out`)
      queryClient.invalidateQueries()
    },
    onError: () => {
      toast.error('There was an error while checking out')
    }
  })

  return { checkoutMutate, isCheckingOut }
}
