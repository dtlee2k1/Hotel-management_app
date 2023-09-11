import CabinType from '../../types/cabin.type'
import useCabins from './useCabins'
import CabinRow from './CabinRow'
import Spinner from '../../ui/Spinner'
import Table from '../../ui/Table'
import Menus from '../../ui/Menus'

export default function CabinTable() {
  // Fetch CabinsList using react query
  const { cabins, isLoading } = useCabins()

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
          data={cabins || []}
          render={(cabin: CabinType) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  )
}
