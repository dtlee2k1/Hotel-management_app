import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import { updateBooking } from '../../services/apiBookings'
import { BookingType } from '../../types/booking.type'
import { useNavigate } from 'react-router-dom'

export default function useCheckin() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { mutate: checkinMutate, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({
      bookingId,
      breakfast
    }: {
      bookingId: string
      breakfast: Partial<Pick<BookingType, 'hasBreakfast' | 'totalPrice' | 'extrasPrice'>>
    }) =>
      updateBooking(bookingId, {
        status: 'checked-in',
        isPaid: true,
        ...breakfast
      }),
    onSuccess: (data: BookingType) => {
      toast.success(`Booking data #${data.id} successfully checked in`)
      queryClient.invalidateQueries()
      navigate('/bookings')
    },
    onError: () => {
      toast.error('There was an error while checking in')
    }
  })

  return { checkinMutate, isCheckingIn }
}
