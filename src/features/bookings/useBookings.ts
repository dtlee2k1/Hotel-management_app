import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getBookings } from '../../services/apiBookings'
import { useSearchParams } from 'react-router-dom'
import { PAGE_SIZE } from '../../utils/constants'

export default function useBookings() {
  const queryClient = useQueryClient()
  const [searchParams] = useSearchParams()

  // 1) FILTER
  const filteredValue = searchParams.get('status') || 'all'
  const filter = filteredValue === 'all' ? null : { field: 'status', value: filteredValue }

  // 2) SORT
  const sortByRaw = searchParams.get('sortBy') || 'startDate-asc'
  const [field, direction] = sortByRaw.split('-')
  const sortBy = { field, direction }

  // 3) PAGINATION
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'))

  // QUERY
  const { data, isLoading } = useQuery({
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page })
  })

  const bookings = data?.data || []
  const count = data?.count || 0

  // PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE)
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 })
    })

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 })
    })

  return { bookings, isLoading, count }
}
