import { useState, useEffect } from 'react'
import styled from 'styled-components'
import BookingDataBox from '../bookings/BookingDataBox'

import { useMoveBack } from '../../hooks/useMoveBack'
import { useBooking } from '../bookings/useBooking'
import { BookingType } from '../../types/booking.type'

import Row from '../../ui/Row'
import Heading from '../../ui/Heading'
import ButtonGroup from '../../ui/ButtonGroup'
import Button from '../../ui/Button'
import ButtonText from '../../ui/ButtonText'
import Spinner from '../../ui/Spinner'
import Checkbox from '../../ui/Checkbox'
import { formatCurrency } from '../../utils/helpers'
import useChecking from './useChecking'

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`

function CheckinBooking() {
  const moveBack = useMoveBack()

  const { booking, isLoading } = useBooking()
  const { checkinMutate, isCheckingIn } = useChecking()
  const [confirmPaid, setConfirmPaid] = useState<boolean>(false)

  useEffect(() => {
    if (booking?.isPaid) setConfirmPaid(true)
  }, [booking])

  if (isLoading) return <Spinner />

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights
  } = booking as BookingType

  function handleConfirmPaid() {
    setConfirmPaid((confirm) => !confirm)
  }

  function handleCheckin() {
    if (!confirmPaid) return
    checkinMutate(bookingId)
  }

  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking as BookingType} />

      <Box>
        <Checkbox
          id='confirm'
          checked={confirmPaid}
          disabled={booking?.isPaid || isCheckingIn}
          onChange={handleConfirmPaid}
        >
          I confirmed that {guests.fullName} has paid the total amount of{' '}
          {formatCurrency(totalPrice)}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={isCheckingIn || booking?.isPaid || !confirmPaid}>
          Check in booking #{bookingId}
        </Button>
        <Button $variation='secondary' onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  )
}

export default CheckinBooking
