import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import { updateBooking } from '../../services/apiBookings'
import { BookingType } from '../../types/booking.type'
import { useNavigate } from 'react-router-dom'

export default function useChecking() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { mutate: checkinMutate, isLoading: isCheckingIn } = useMutation({
    mutationFn: (bookingId: string) =>
      updateBooking(bookingId, {
        status: 'checked-in',
        isPaid: true
      }),
    onSuccess: (data: BookingType) => {
      toast.success(`Booking data #${data.id} successfully checked in`)
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
      navigate('/bookings')
    },
    onError: (error) => {
      toast.error((error as Error).message)
    }
  })

  return { checkinMutate, isCheckingIn }
}
