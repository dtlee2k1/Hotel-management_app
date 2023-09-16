import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getCabins } from '../../services/apiCabins'
import { useSearchParams } from 'react-router-dom'
import { PAGE_SIZE } from '../../utils/constants'

export default function useCabins() {
  const queryClient = useQueryClient()

  // PAGINATION
  const [searchParams] = useSearchParams()
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'))

  // QUERY
  const { data, isLoading } = useQuery({
    queryKey: ['cabins', page],
    queryFn: () => getCabins(page)
  })

  const cabins = data?.data || []
  const count = data?.count || 0

  // PREFETCHING
  const countPage = Math.ceil(count / PAGE_SIZE)
  if (page < countPage)
    queryClient.prefetchQuery({
      queryKey: ['cabins', page + 1],
      queryFn: () => getCabins(page + 1)
    })

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ['cabins', page - 1],
      queryFn: () => getCabins(page - 1)
    })

  return { cabins, count, isLoading }
}
