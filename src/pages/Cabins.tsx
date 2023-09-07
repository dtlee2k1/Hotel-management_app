import { useState } from 'react'
import Heading from '../ui/Heading'
import Row from '../ui/Row'
import CabinTable from '../features/cabins/CabinTable'
import CreateCabinForm from '../features/cabins/CreateCabinForm'
import Button from '../ui/Button'

function Cabins() {
  const [showForm, setShowForm] = useState<boolean>(false)

  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>
      <Row type='vertical'>
        <CabinTable />
        <Button onClick={() => setShowForm((show) => !show)}>Add new cabin</Button>
        {showForm && <CreateCabinForm setShowForm={setShowForm} />}
      </Row>
    </>
  )
}

export default Cabins
