import Button from '../../ui/Button'
import useCheckout from './useCheckout'

interface CheckoutButtonProps {
  bookingId: string
}

function CheckoutButton({ bookingId }: CheckoutButtonProps) {
  const { checkoutMutate, isCheckingOut } = useCheckout()

  return (
    <Button
      $variation='primary'
      size='small'
      disabled={isCheckingOut}
      onClick={() => checkoutMutate(bookingId)}
    >
      Check out
    </Button>
  )
}

export default CheckoutButton
