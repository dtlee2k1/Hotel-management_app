import CabinType from '../../types/cabin.type'
import useCabins from './useCabins'
import CabinRow from './CabinRow'
import Spinner from '../../ui/Spinner'
import Table from '../../ui/Table'
import Menus from '../../ui/Menus'
import { useSearchParams } from 'react-router-dom'

export default function CabinTable() {
  // Fetch CabinsList using react query
  const { cabins, isLoading } = useCabins()
  // Get searchParams from URL for FILTER/SORT feature
  const [searchParams] = useSearchParams()

  // 1) FILTER
  const filteredValue = searchParams.get('discount') || 'all'

  let filteredCabins: CabinType[] = []

  // Filter Cabins list by key value `discount`
  if (filteredValue === 'all') filteredCabins = cabins || []
  if (filteredValue === 'no-discount')
    filteredCabins = cabins?.filter((cabin) => cabin.discount === 0) || []
  if (filteredValue === 'with-discount')
    filteredCabins = cabins?.filter((cabin) => cabin.discount > 0) || []

  // 2) SORT
  const SortBy = searchParams.get('sortBy') || 'startDate-asc'
  const [field, direction] = SortBy.split('-')
  // Sort the Cabins list depends on the filteredCabins
  const sortedCabins = filteredCabins.sort((a, b) => {
    const val1 = a[field as keyof Pick<CabinType, 'name' | 'regularPrice' | 'maxCapacity'>]
    const val2 = b[field as keyof Pick<CabinType, 'name' | 'regularPrice' | 'maxCapacity'>]

    const order = direction === 'asc' ? 1 : -1

    switch (typeof val1) {
      case 'number': {
        const bValue = val2 as number
        const result = val1 - bValue
        return result * order
      }
      case 'string': {
        const bValue = val2 as string
        const result = val1.localeCompare(bValue)
        return result * order
      }
      // Add other cases like boolean, etc.
      default:
        return 0
    }
  })

  if (isLoading) return <Spinner />

  return (
    // Boundary all `Table` into `Menus` to keep track which `Menu(Dup,Edit,Del)` in each `CabinRow` is opened at the time
    <Menus>
      <Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin: CabinType) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  )
}
