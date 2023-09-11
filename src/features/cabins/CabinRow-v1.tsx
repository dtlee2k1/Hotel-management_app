import styled from 'styled-components'
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2'
import { formatCurrency } from '../../utils/helpers'

import CabinType from '../../types/cabin.type'
import useCreateCabin from './useCreateCabin'
import useDeleteCabin from './useDeleteCabin'
import CreateCabinForm from './CreateCabinForm'
import ConfirmDelete from '../../ui/ConfirmDelete'
import Modal from '../../ui/Modal'
import Table from '../../ui/Table'
import Menus from '../../ui/Menus'

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`

interface CabinRowProps {
  cabin: CabinType
}

export default function CabinRow({ cabin }: CabinRowProps) {
  const { id: cabinId, discount, image, name, regularPrice, maxCapacity, description } = cabin

  const { createCabinMutate, isCreating } = useCreateCabin()
  const { deleteCabinMutate, isDeleting } = useDeleteCabin()

  const handleDuplicate = () => {
    const duplicatedCabin = {
      name: `copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description
    }
    createCabinMutate(duplicatedCabin)
  }

  return (
    <Table.Row>
      <Img src={image as string} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? <Discount>{formatCurrency(discount)}</Discount> : <span>&mdash;</span>}

      <div>
        <button disabled={isCreating} onClick={handleDuplicate}>
          <HiSquare2Stack />
        </button>
        <Modal>
          <Modal.Open opens='edit'>
            <button>
              <HiPencil />
            </button>
          </Modal.Open>
          <Modal.Window name='edit'>
            <CreateCabinForm cabinToEdit={cabin} />
          </Modal.Window>
        </Modal>

        <Modal>
          <Modal.Open opens='delete'>
            <button>
              <HiTrash />
            </button>
          </Modal.Open>
          <Modal.Window name='delete'>
            <ConfirmDelete
              resourceName={`cabin`}
              onConfirm={() => deleteCabinMutate(cabinId as string)}
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  )
}
