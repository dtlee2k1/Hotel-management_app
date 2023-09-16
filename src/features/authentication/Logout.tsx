import ButtonIcon from '../../ui/ButtonIcon'
import { HiArrowRightOnRectangle } from 'react-icons/hi2'
import { useLogout } from './useLogout'

export default function Logout() {
  const { logoutMutate, isLoading } = useLogout()

  const handleLogout = () => {
    logoutMutate()
  }

  return (
    <ButtonIcon disabled={isLoading} onClick={handleLogout}>
      <HiArrowRightOnRectangle />
    </ButtonIcon>
  )
}
