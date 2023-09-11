import Button from '../../ui/Button'
import CreateCabinForm from './CreateCabinForm'
import Modal from '../../ui/Modal'
import { styled } from 'styled-components'

const StyledAddCabin = styled.div`
  margin-left: auto;
`

export default function AddCabin() {
  return (
    <StyledAddCabin>
      <Modal>
        <Modal.Open opens='cabin-form'>
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name='cabin-form'>
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </StyledAddCabin>
  )
}

// export default function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

//   return (
//     <>
//       <Button onClick={() => setIsOpenModal((show) => !show)}>Add new cabin</Button>
//       {isOpenModal && (
//         <Modal onCloseModal={() => setIsOpenModal(false)}>
//           <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
//         </Modal>
//       )}
//     </>
//   )
// }
