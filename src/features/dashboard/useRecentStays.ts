import { useQuery } from '@tanstack/react-query'
import { subDays } from 'date-fns'
import { useSearchParams } from 'react-router-dom'
import { getStaysAfterDate } from '../../services/apiBookings'

export function useRecentStays() {
  const [searchParams] = useSearchParams()

  const numsDay = !searchParams.get('last') ? 7 : Number(searchParams.get('last'))

  const queryDate = subDays(new Date(), numsDay).toISOString()

  const { data: stays, isLoading } = useQuery({
    queryKey: ['bookings', `last-${numsDay}`],
    queryFn: () => getStaysAfterDate(queryDate)
  })

  const confirmedStays = stays?.filter(
    (stay) => stay.status === 'checked-in' || stay.status === 'checked-out'
  )

  return { stays, isLoading, confirmedStays }
}
